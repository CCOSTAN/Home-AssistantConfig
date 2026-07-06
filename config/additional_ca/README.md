# Additional CA Certificates

This folder contains certificate authorities loaded by the Additional CA custom
integration at Home Assistant startup.

The live Additional CA custom component install is intentionally kept out of
source control. Maintain it through HACS/manual install in the Home Assistant
environment while this workaround is needed.

## Rheem EcoNet temporary workaround

`DigiCertGlobalRootCA.crt.pem` temporarily restores trust for the Rheem EcoNet
ClearBlade endpoint while `rheem.clearblade.com` still chains to the legacy
DigiCert Global Root CA (G1).

Local tracker: https://github.com/CCOSTAN/Home-AssistantConfig/issues/1820

Upstream references:
- https://github.com/home-assistant/core/issues/172228
- https://github.com/home-assistant/operating-system/issues/4775
- https://docs.clearblade.com/iotcore/digicert-g1-root-ca-distrust
- https://knowledge.digicert.com/alerts/digicert-root-strategy-aligning-with-industry-standards

Verification values for the installed PEM:
- PEM SHA256: `39FDCF28AEFFE08D03251FCCAF645E3C5DE19FA4EBBAFC89B4EDE2A422148BAB`
- Certificate DER fingerprint: `4348A0E9444C78CB265E058D5E8944B4D84F9662BD26DB257F8934A443C70161`

Remove this certificate, the `additional_ca` entry in `configuration.yaml`, and
the Additional CA custom component if it has no other use after the upstream
Rheem/ClearBlade certificate chain validates with the stock Home Assistant trust
store.
