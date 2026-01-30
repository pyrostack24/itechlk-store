/**
 * Generate HTML-based Invoice (CraxsHub Style adapted for iTechLK)
 * This provides a printable invoice template similar to CraxsHub's system
 */

interface InvoiceOrderData {
  orderNumber: string
  createdAt: Date
  customerName: string
  customerEmail: string
  phoneNumber?: string
  whatsappNumber?: string
  items: Array<{
    productName: string
    variantName?: string
    quantity: number
    months?: number
    price: number
  }>
  totalAmount: number
  status: string
  paymentMethod?: string
}

export function generateInvoiceHTML(orderData: InvoiceOrderData): string {
  // Create invoice HTML for PDF conversion or printing
  const invoiceHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Invoice ${orderData.orderNumber}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      color: #333;
      min-height: 297mm;
      width: 210mm;
    }
    .invoice-wrapper {
      padding: 20mm;
      min-height: 257mm;
      box-sizing: border-box;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      border-bottom: 3px solid #667eea;
      padding-bottom: 20px;
    }
    .company-name {
      font-size: 32px;
      font-weight: bold;
      color: #667eea;
      margin-bottom: 5px;
    }
    .invoice-title {
      font-size: 24px;
      color: #666;
      margin-top: 10px;
    }
    .info-section {
      display: flex;
      justify-content: space-between;
      margin-bottom: 25px;
    }
    .info-box {
      width: 48%;
    }
    .info-label {
      font-weight: bold;
      color: #666;
      font-size: 12px;
      text-transform: uppercase;
      margin-bottom: 5px;
    }
    .info-value {
      font-size: 14px;
      margin-bottom: 10px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 25px 0;
    }
    th {
      background-color: #667eea;
      color: white;
      padding: 12px;
      text-align: left;
      font-weight: bold;
    }
    td {
      padding: 12px;
      border-bottom: 1px solid #ddd;
      white-space: nowrap;
    }
    tr:hover {
      background-color: #f9f9f9;
    }
    .totals {
      margin-top: 25px;
      text-align: right;
    }
    .total-row {
      display: flex;
      justify-content: flex-end;
      padding: 8px 0;
      font-size: 14px;
    }
    .total-label {
      width: 150px;
      text-align: right;
      padding-right: 20px;
      color: #666;
    }
    .total-value {
      width: 150px;
      text-align: right;
      font-weight: bold;
      white-space: nowrap;
    }
    .grand-total {
      border-top: 2px solid #667eea;
      margin-top: 10px;
      padding-top: 10px;
      font-size: 18px;
    }
    .grand-total .total-value {
      color: #667eea;
      font-size: 24px;
    }
    .status-badge {
      display: inline-block;
      padding: 8px 16px;
      background-color: #fbbf24;
      color: #78350f;
      border-radius: 20px;
      font-weight: bold;
      font-size: 12px;
      text-transform: uppercase;
    }
    .status-badge.completed {
      background-color: #10b981;
      color: white;
    }
    .status-badge.processing {
      background-color: #3b82f6;
      color: white;
    }
    .status-badge.cancelled {
      background-color: #ef4444;
      color: white;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      text-align: center;
      color: #666;
      font-size: 12px;
    }
    .important-note {
      background-color: #d1fae5;
      border-left: 4px solid #10b981;
      padding: 15px;
      margin: 20px 0;
      font-size: 13px;
    }
    @media print {
      body {
        margin: 0;
        padding: 0;
        width: 210mm;
        min-height: 297mm;
      }
      .invoice-wrapper {
        padding: 15mm;
      }
      .no-print {
        display: none;
      }
      @page {
        size: A4;
        margin: 0;
      }
    }
  </style>
</head>
<body>
  <div class="invoice-wrapper">
    <div class="header">
      <div class="company-name">iTechLK Store</div>
      <div class="invoice-title">INVOICE</div>
    </div>

  <div class="info-section">
    <div class="info-box">
      <div class="info-label">Invoice Number</div>
      <div class="info-value">${orderData.orderNumber}</div>
      
      <div class="info-label">Date</div>
      <div class="info-value">${new Date(orderData.createdAt).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}</div>
      
      <div class="info-label">Status</div>
      <div class="info-value">
        <span class="status-badge ${orderData.status.toLowerCase()}">${getStatusText(orderData.status)}</span>
      </div>
    </div>

    <div class="info-box">
      <div class="info-label">Customer Information</div>
      <div class="info-value"><strong>Name:</strong> ${orderData.customerName}</div>
      <div class="info-value"><strong>Email:</strong> ${orderData.customerEmail}</div>
      ${orderData.phoneNumber ? `<div class="info-value"><strong>Phone:</strong> ${orderData.phoneNumber}</div>` : ''}
      ${orderData.whatsappNumber ? `<div class="info-value"><strong>WhatsApp:</strong> ${orderData.whatsappNumber}</div>` : ''}
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 50%">Product</th>
        <th style="width: 15%; text-align: center">Quantity</th>
        <th style="width: 15%; text-align: center">Duration</th>
        <th style="width: 20%; text-align: right">Price</th>
      </tr>
    </thead>
    <tbody>
      ${orderData.items.map((item) => `
        <tr>
          <td>
            <strong>${item.productName}</strong>
            ${item.variantName ? `<br><small style="color: #666;">${item.variantName}</small>` : ''}
          </td>
          <td style="text-align: center">${item.quantity}</td>
          <td style="text-align: center">${item.months ? `${item.months} ${item.months > 1 ? 'months' : 'month'}` : 'N/A'}</td>
          <td style="text-align: right">LKR ${formatPrice(item.price * item.quantity * (item.months || 1))}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="totals">
    <div class="total-row">
      <div class="total-label">Subtotal:</div>
      <div class="total-value">LKR ${formatPrice(orderData.totalAmount)}</div>
    </div>
    <div class="total-row">
      <div class="total-label">Tax:</div>
      <div class="total-value">LKR 0.00</div>
    </div>
    <div class="total-row grand-total">
      <div class="total-label">TOTAL:</div>
      <div class="total-value">LKR ${formatPrice(orderData.totalAmount)}</div>
    </div>
  </div>

  ${orderData.status === 'COMPLETED' ? `
  <div class="important-note">
    <strong>✅ Order Completed:</strong> Your account credentials have been delivered. If you haven't received them, please contact us via WhatsApp: +94 74 257 0943
  </div>
  ` : ''}

  <div class="footer">
    <p><strong>iTechLK Store</strong> - Premium Digital Subscriptions at Affordable Prices</p>
    <p>Morawaka, Sri Lanka | Email: support@itechlk.store | Phone: +94 74 257 0943</p>
    <p>Thank you for your order!</p>
  </div>
  </div>
</body>
</html>
  `

  return invoiceHTML
}

/**
 * Generate and open invoice in a new window for printing
 */
export function printInvoice(orderData: InvoiceOrderData): void {
  const invoiceHTML = generateInvoiceHTML(orderData)
  
  // Create a new window and print
  const printWindow = window.open('', '_blank')
  if (printWindow) {
    printWindow.document.write(invoiceHTML)
    printWindow.document.close()
    
    // Wait for content to load then trigger print
    printWindow.onload = () => {
      printWindow.print()
    }
  }
}

/**
 * Download invoice as HTML file
 */
export function downloadInvoiceHTML(orderData: InvoiceOrderData): void {
  const invoiceHTML = generateInvoiceHTML(orderData)
  const blob = new Blob([invoiceHTML], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `Invoice-${orderData.orderNumber}.html`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Helper functions
function formatPrice(price: number): string {
  return price.toLocaleString('en-LK', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function getStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    'PENDING': 'Pending Approval',
    'PROCESSING': 'Processing',
    'COMPLETED': 'Completed',
    'CANCELLED': 'Cancelled',
    'REFUNDED': 'Refunded',
  }
  return statusMap[status] || status
}
