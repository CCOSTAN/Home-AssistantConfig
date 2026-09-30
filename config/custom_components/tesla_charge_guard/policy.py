"""Classify measured charging data without treating cached values as fresh."""

from math import isfinite


def number(value):
    """Reject missing, boolean, negative, and non-finite measurements."""
    try:
        result = float(value)
    except (TypeError, ValueError):
        return None
    return result if not isinstance(value, bool) and isfinite(result) and result >= 0 else None


def fresh(timestamp, now, max_age):
    """Accept source timestamps with at most five seconds of clock skew."""
    timestamp = number(timestamp)
    return timestamp is not None and -5 <= now - timestamp <= max_age


def classify(tesla, juicebox, now, limit=18, session_active=False):
    """Return a conservative, privacy-safe home charging assessment."""
    tc = number(tesla.get("current"))
    jc = number(juicebox.get("current"))
    ts = str(tesla.get("charging", "")).lower()
    js = str(juicebox.get("status", "")).lower()
    tesla_sample_fresh = fresh(tesla.get("sample_time"), now, 120)
    tf = tesla_sample_fresh and tc is not None
    jf = (fresh(juicebox.get("current_time"), now, 60)
          and fresh(juicebox.get("status_time"), now, 60) and jc is not None)
    location_fresh = fresh(tesla.get("location_time"), now, 120)
    at_home = tesla.get("at_home")
    dc = tesla.get("dc")
    # A fresh away/DC report vetoes vehicle commands, including cached home hints.
    away = (location_fresh and at_home is False) or (tesla_sample_fresh and dc is True)
    home = not away and ((at_home is True and dc is False) or session_active)
    # The newest known source owns session context. Old Tesla charging data must
    # not resurrect a session after a newer JuiceBox report confirmed unplugged.
    jb_latest = (number(juicebox.get("current_time")) or 0) >= (number(tesla.get("sample_time")) or 0)
    active = jc is not None and jc > 0 if jb_latest else ts in {"charging", "starting"}
    connected = js not in {"", "unknown", "unavailable", "unplugged"}
    context = active or connected if jb_latest else active or tesla.get("plugged") is True
    home_session = not away and ((home and (session_active or context)) or (jb_latest and jc is not None and context))
    result = {
        "status": "unverified", "actual_current": None, "source": "none",
        "tesla_fresh": tf, "juicebox_fresh": jf,
        "home_session": home_session, "stop_allowed": home and home_session,
        "session_observed": None,
        "checked_at": now, "sample_time": 0,
        "tesla_sample_time": tesla.get("sample_time", 0),
        "juicebox_sample_time": juicebox.get("current_time", 0),
        "reason": "No fresh charging report; cached values cannot verify safety.",
    }
    if away and not (jf and jc > limit):
        result.update(status="away", stop_allowed=False, home_session=False, session_observed=False,
                      reason="Fresh away or DC charging report; home stop commands blocked.")
        # Charging elsewhere must not prevent a recovered home charger from
        # clearing its own incident. This still never permits a vehicle command.
        if jf and jc == 0 and js in {"unplugged", "plugged in", "plugged", "connected", "standby", "ready"}:
            result.update(status="stopped", actual_current=0, source="juicebox",
                          sample_time=juicebox["current_time"],
                          reason="Fresh home charger zero current confirms the home incident is stopped.")
        return result
    # Either live source can expose excessive draw; a lower reading cannot mask it.
    excessive = []
    if jf and jc > limit:
        excessive.append((jc, "juicebox", juicebox["current_time"]))
    if tf and home and ts in {"charging", "starting"} and tc > limit:
        excessive.append((tc, "tesla", tesla["sample_time"]))
    if excessive:
        current, source, timestamp = max(excessive)
        result.update(status="excessive", actual_current=current, source=source,
                      sample_time=timestamp, stop_allowed=home, home_session=True,
                      session_observed=True if home else None,
                      reason=f"Fresh measured home current exceeds {limit:g} A.")
        return result
    if jf and jc == 0 and tf and ts in {"charging", "starting"} and tc > 0:
        result.update(home_session=home, stop_allowed=home,
                      reason="Fresh sources disagree about whether charging is active.")
        return result
    # A fresh active report prevents an older/fresh conflicting zero from clearing.
    if (jf and jc > 0) or (tf and ts in {"charging", "starting"}):
        if home and ((jf and 0 < jc <= limit) or
                     (tf and ts in {"charging", "starting"} and 0 < tc <= limit)):
            source = "juicebox" if jf and jc > 0 else "tesla"
            result.update(status="charging_safe", source=source,
                          home_session=True, stop_allowed=True, session_observed=True,
                          actual_current=jc if source == "juicebox" else tc,
                          sample_time=juicebox["current_time"] if source == "juicebox" else tesla["sample_time"],
                          reason="Fresh home charging current is within the guardrail.")
        return result
    if ((jf and jc == 0 and js in {"unplugged", "plugged in", "plugged", "connected", "standby", "ready"}) or
            (tf and tc == 0 and ts in {"stopped", "complete", "disconnected", "no_power"})):
        source = "juicebox" if jf and jc == 0 else "tesla"
        result.update(status="stopped", actual_current=0, source=source,
                      sample_time=juicebox["current_time"] if source == "juicebox" else tesla["sample_time"],
                      stop_allowed=False, reason="Fresh measured zero current confirms charging is stopped.")
        # Keep a connected stopped session in scope: charging can resume after
        # power returns. Only a fresh unplugged/away report ends the durable lease.
        unplugged = js == "unplugged" if source == "juicebox" else ts == "disconnected"
        result.update(home_session=home and not unplugged,
                      session_observed=False if unplugged else True if home else None)
    return result
