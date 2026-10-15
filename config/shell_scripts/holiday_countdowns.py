#!/usr/bin/env python3
"""Calculate household holiday calendars and countdowns without network requests.

Uses python-dateutil and hdate from the Home Assistant container. The container's
local timezone supplies today's date; --date supports operator previews.
Reads fixed dates and one-off additions from www/json_data; floating dates never
need an annual table update. Chanukkah targets the first daytime date (25 Kislev).
Its first candle-lighting evening is the preceding Gregorian date.
"""

from __future__ import annotations

import argparse
import calendar
import json
from datetime import date, datetime, timedelta
from pathlib import Path

from dateutil.easter import easter


def nth_weekday(year: int, month: int, weekday: int, occurrence: int) -> date:
    """Return an occurrence of a weekday, with Monday numbered zero."""
    first = date(year, month, 1)
    return first + timedelta(days=(weekday - first.weekday()) % 7 + 7 * (occurrence - 1))


def memorial_day(year: int) -> date:
    """Return the last Monday in May, rather than an observed substitute date."""
    last = date(year, 5, calendar.monthrange(year, 5)[1])
    return last - timedelta(days=last.weekday())


GREGORIAN_RULES = {
    "halloween": lambda year: date(year, 10, 31),
    "christmas": lambda year: date(year, 12, 25),
    "easter": easter,
    "mothers": lambda year: nth_weekday(year, 5, 6, 2),
    "fathers": lambda year: nth_weekday(year, 6, 6, 3),
    "labor_day": lambda year: nth_weekday(year, 9, 0, 1),
    "memorial_day": memorial_day,
    "thanksgiving_day": lambda year: nth_weekday(year, 11, 3, 4),
}

# Actual calendar dates, not substitute weekdays used for employee time off.
HOLIDAY_RULES = {
    "MLK Day": lambda year: nth_weekday(year, 1, 0, 3),
    "Presidents Day": lambda year: nth_weekday(year, 2, 0, 3),
    "Mardi Gras": lambda year: easter(year) - timedelta(days=47),
    "Ash Wednesday": lambda year: easter(year) - timedelta(days=46),
    "Palm Sunday": lambda year: easter(year) - timedelta(days=7),
    "Good Friday": lambda year: easter(year) - timedelta(days=2),
    "Easter Sunday": GREGORIAN_RULES["easter"],
    "Mothers Day": GREGORIAN_RULES["mothers"],
    "Fathers Day": GREGORIAN_RULES["fathers"],
    "Memorial Day": GREGORIAN_RULES["memorial_day"],
    "Labor Day": GREGORIAN_RULES["labor_day"],
    "Columbus Day": lambda year: nth_weekday(year, 10, 0, 2),
    "Thanksgiving Day": GREGORIAN_RULES["thanksgiving_day"],
}
FLAG_RULES = {
    "Martin Luther King Jr. Day": HOLIDAY_RULES["MLK Day"],
    "Washington's Birthday (Presidents Day)": HOLIDAY_RULES["Presidents Day"],
    "Armed Forces Day": lambda year: nth_weekday(year, 5, 5, 3),
    "Memorial Day": GREGORIAN_RULES["memorial_day"],
    "Labor Day": GREGORIAN_RULES["labor_day"],
    "National POW/MIA Recognition Day": lambda year: nth_weekday(year, 9, 4, 3),
    "Columbus Day": HOLIDAY_RULES["Columbus Day"],
    "Election Day": lambda year: nth_weekday(year, 11, 0, 1) + timedelta(days=1),
}


def chanukkah_in_year(year: int) -> date:
    """Return 25 Kislev falling in the requested Gregorian year."""
    from hdate.hebrew_date import HebrewDate, Months

    hebrew_year = HebrewDate.from_gdate(date(year, 1, 1)).year
    target = HebrewDate(hebrew_year, Months.KISLEV, 25).to_gdate()
    if target.year < year:
        target = HebrewDate(hebrew_year + 1, Months.KISLEV, 25).to_gdate()
    return target


def calendar_data(kind: str, today: date, data_dir: Path | None = None) -> dict:
    """Merge perpetual rules with household fixed dates and one-off additions.

    Attribute names stay compatible with the former REST sensors. Three years
    cover next-year lookahead and Hanukkah evenings that cross New Year's Day.
    Multiple events sharing a date are retained rather than silently overwritten.
    """
    data_dir = data_dir or Path(__file__).resolve().parents[1] / "www" / "json_data"
    filename, attribute, rules = (
        ("holidays.json", "MAJOR_US", HOLIDAY_RULES)
        if kind == "holiday"
        else ("flag_days.json", "Flag_Days_US", FLAG_RULES)
    )
    source = json.loads((data_dir / filename).read_text(encoding="utf-8"))[attribute]
    events: dict[date, list[str]] = {}
    for year in range(today.year - 1, today.year + 2):
        for name, rule in rules.items():
            events.setdefault(rule(year), []).append(name)
        if kind == "holiday":
            events.setdefault(chanukkah_in_year(year), []).append("Chanukkah")
        elif year % 4 == 1:
            events.setdefault(date(year, 1, 20), []).append("Inauguration Day")
    for key, name in source.get("dynamic", {}).items():
        month, day, year = map(int, key.split("/"))
        names = events.setdefault(date(year, month, day), [])
        if name not in names:
            names.append(name)
    dynamic = {day.strftime("%m/%d/%Y"): "; ".join(names) for day, names in sorted(events.items())}
    fixed_name = source["static"].get(f"{today.month}/{today.day}", "")
    event_name = dynamic.get(today.strftime("%m/%d/%Y"), "")
    state = (fixed_name or event_name) if kind == "holiday" else str(bool(fixed_name or event_name))
    return {"state": state, attribute: {"static": source["static"], "dynamic": dynamic}}


def next_holiday(holiday: str, today: date) -> date:
    """Find the next holiday date, including today when it is the holiday."""
    if holiday == "chanukkah":
        target = chanukkah_in_year(today.year)
        if target < today:
            target = chanukkah_in_year(today.year + 1)
        return target

    rule = GREGORIAN_RULES[holiday]
    target = rule(today.year)
    return rule(today.year + 1) if target < today else target


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("holiday", choices=sorted([*GREGORIAN_RULES, "chanukkah", "holiday", "flag"]))
    parser.add_argument("--date", type=date.fromisoformat, help="Preview an ISO date")
    args = parser.parse_args()
    today = args.date or datetime.now().astimezone().date()
    if args.holiday in ("holiday", "flag"):
        print(json.dumps(calendar_data(args.holiday, today)))
    else:
        print((next_holiday(args.holiday, today) - today).days)


if __name__ == "__main__":
    main()
