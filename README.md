# INVEXA

A focused GST invoice management application for freelancers and small service businesses in India.

This repository is the public portfolio showcase for INVEXA. It documents the product, engineering decisions, GST logic, and completed functionality without publishing the private Django application source code.

## Live Showcase

[View the INVEXA showcase](https://ajmalshan211.github.io/INVEXA-showcase/)

## What INVEXA Does

INVEXA provides a clear workflow for managing GST invoice data:

- Configure a registered business profile with GSTIN, state, address, and optional logo
- Create and manage client records
- Build invoices with one or more line items
- Automatically calculate taxable value, GST, and grand total
- Search invoices and filter them by status
- Update saved invoices and payment status
- Generate printable, downloadable GST invoice PDFs
- Display the appropriate GST tax split based on the supplier and client states

## GST Logic

INVEXA compares the business state with the client state.

| Supply type | Tax treatment |
|---|---|
| Intra-state | CGST and SGST are split equally |
| Inter-state | IGST is applied as one tax amount |

Example: a taxable value of ₹10,000 at 18% GST produces ₹1,800 tax and a ₹11,800 grand total.

- Intra-state: CGST ₹900 + SGST ₹900
- Inter-state: IGST ₹1,800

## Completed Features

- Django data models for business profiles, clients, invoices, and line items
- GSTIN and state validation
- Business Profile create and edit workflow
- Optional business-logo upload
- Client create, search, and edit workflow
- Invoice creation, editing, status updates, search, and filtering
- Dynamic invoice line items
- Intra-state CGST + SGST calculation
- Inter-state IGST calculation
- Professional browser-viewable and downloadable GST invoice PDFs
- Automated GST calculation tests

## Technology

- Python
- Django
- SQLite
- HTML
- CSS
- JavaScript
- xhtml2pdf
- Pillow

## Project Structure

INVEXA is maintained in two separate repositories:

| Repository | Visibility | Purpose |
|---|---|---|
| `INVEXA-showcase` | Public | Portfolio case study and project presentation |
| `INVEXA-core` | Private | Full Django application source code |

The private core repository is intentionally not published because it contains the complete application implementation and local development configuration.

## Validation

The private application has been verified with:

```text
python manage.py check
python manage.py test

Current automated result:

4 tests passed

Manual testing also verified both PDF GST cases:

Kerala client: CGST + SGST invoice PDF
Tamil Nadu client: IGST-only invoice PDF
Current Status

INVEXA is a functional portfolio MVP.

The core invoice workflow, GST calculations, custom business-profile workflow, PDF export, and automated tests are complete. Final documentation and Windows executable packaging are in progress.

Author

Designed and developed by Ajmal Shan.