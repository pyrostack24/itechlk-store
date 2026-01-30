#!/bin/bash
# Quick fix script for the order creation error

echo "🔧 Fixing Order Creation Error..."
echo ""
echo "Step 1: Running database seed..."

# Run the seed command
npm run db:seed

if [ $? -eq 0 ]; then
    echo "✅ Database seeded successfully!"
    echo ""
    echo "Step 2: Verification"
    echo "Please test the order creation by:"
    echo "1. Adding products to cart"
    echo "2. Going to checkout"
    echo "3. Filling in customer information"
    echo "4. Uploading payment receipt"
    echo "5. Placing the order"
    echo ""
    echo "The order should now be created successfully!"
else
    echo "❌ Seed failed. Please check your database connection."
    echo "Make sure your DATABASE_URL is set correctly in .env"
fi
