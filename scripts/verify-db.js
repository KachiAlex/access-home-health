const postgres = require('postgres');

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error('Please set DATABASE_URL');
    process.exit(1);
  }

  const sql = postgres(url, { ssl: { rejectUnauthorized: false } });
  try {
    const categories = await sql`select id, name from "ProductCategory" order by name`;
    const products = await sql`select id, name, slug, "priceCents", "categoryId" from "Product" order by name`;
    const variants = await sql`select id, sku, name, "productId", "priceCents" from "ProductVariant" order by id`;

    console.log('Categories:', categories.length);
    console.log(categories.map(c => ({ id: c.id, name: c.name })));

    console.log('\nProducts:', products.length);
    console.log(products.slice(0, 50).map(p => ({ id: p.id, name: p.name, slug: p.slug, priceCents: p.priceCents, categoryId: p.categoryId })));

    console.log('\nVariants:', variants.length);
    console.log(variants.slice(0, 50).map(v => ({ id: v.id, sku: v.sku, name: v.name, productId: v.productId, priceCents: v.priceCents })));

  } catch (err) {
    console.error('Verification failed:', err);
    process.exitCode = 1;
  } finally {
    await sql.end();
  }
}

main();
