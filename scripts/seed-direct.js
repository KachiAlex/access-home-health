const postgres = require('postgres');

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error('Please set DATABASE_URL');
    process.exit(1);
  }

  const sql = postgres(url, { ssl: { rejectUnauthorized: false } });

  try {
    await sql.begin(async (tx) => {
      // Categories
      await tx`INSERT INTO "ProductCategory" (id, name, slug, description, "createdAt", "updatedAt") VALUES
        ('cat_mobility','Mobility','mobility','Wheelchairs, scooters, walkers, canes and related items.', NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;`;

      await tx`INSERT INTO "ProductCategory" (id, name, slug, description, "createdAt", "updatedAt") VALUES
        ('cat_walkers','Walkers & Rollators','walkers-rollators','Standard walkers, rollators and wheeled walkers.', NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;`;

      await tx`INSERT INTO "ProductCategory" (id, name, slug, description, "createdAt", "updatedAt") VALUES
        ('cat_beds','Beds & Accessories','beds-accessories','Hospital beds and bedside equipment.', NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;`;

      await tx`INSERT INTO "ProductCategory" (id, name, slug, description, "createdAt", "updatedAt") VALUES
        ('cat_bathing','Bathing & Toileting','bathing-toileting','Shower chairs, commodes and raised toilet seats.', NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;`;

      await tx`INSERT INTO "ProductCategory" (id, name, slug, description, "createdAt", "updatedAt") VALUES
        ('cat_incontinence','Incontinence & Ostomy','incontinence-ostomy','Incontinence supplies, ostomy and catheter products.', NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;`;

      await tx`INSERT INTO "ProductCategory" (id, name, slug, description, "createdAt", "updatedAt") VALUES
        ('cat_diabetic','Diabetes & Respiratory','diabetes-respiratory','Diabetic devices, nebulizers and respiratory supplies.', NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;`;

      await tx`INSERT INTO "ProductCategory" (id, name, slug, description, "createdAt", "updatedAt") VALUES
        ('cat_braces','Braces & Footwear','braces-footwear','Back, wrist, knee braces and therapeutic footwear.', NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;`;

      await tx`INSERT INTO "ProductCategory" (id, name, slug, description, "createdAt", "updatedAt") VALUES
        ('cat_monitoring','Monitoring & Small DME','monitoring-dme','Oximeters, blood pressure monitors, CGM readers and similar.', NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;`;

      await tx`INSERT INTO "ProductCategory" (id, name, slug, description, "createdAt", "updatedAt") VALUES
        ('cat_other','Other DME','other-dme','Miscellaneous DME supplies (excludes oxygen).', NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;`;

      // Products (id, name, slug, shortDescription, priceCents, currency, categoryId)
      const products = [
        ['prod_motorized_wheelchair','Motorized Wheelchair','motorized-wheelchair','Electric motorized wheelchair for powered mobility.',250000,'USD','cat_mobility'],
        ['prod_scooter_electric','Mobility Scooter','mobility-scooter','3- or 4-wheel electric scooter for personal mobility.',120000,'USD','cat_mobility'],
        ['prod_manual_wheelchair','Manual Wheelchair','manual-wheelchair','Lightweight manual wheelchair for everyday use.',35000,'USD','cat_mobility'],
        ['prod_rollator','Rollator Walker','rollator-walker','Three- or four-wheeled rollator with seat and storage.',8500,'USD','cat_walkers'],
        ['prod_standard_walker','Standard Walker','standard-walker','Classic folding walker for stability and support.',4500,'USD','cat_walkers'],
        ['prod_walker_with_wheels','Walker with Wheels','walker-with-wheels','Walker with front wheels for easier movement.',6500,'USD','cat_walkers'],
        ['prod_hospital_bed','Hospital Bed','hospital-bed','Adjustable hospital-style bed for home care.',120000,'USD','cat_beds'],
        ['prod_incontinence_supplies','Incontinence Supplies Pack','incontinence-supplies-pack','Disposable incontinence supplies (sample pack).',2500,'USD','cat_incontinence'],
        ['prod_ostomy_bag','Ostomy Bag','ostomy-bag','Standard ostomy pouch for post-surgical care.',1200,'USD','cat_incontinence'],
        ['prod_catheter','Catheter (Disposable)','disposable-catheter','Single-use catheter supplies.',800,'USD','cat_incontinence'],
        ['prod_shower_chair','Shower Chair','shower-chair','Waterproof shower chair with non-slip feet.',4500,'USD','cat_bathing'],
        ['prod_bedside_commode','Bedside Commode','bedside-commode','Portable bedside commode with removable bucket.',6500,'USD','cat_bathing'],
        ['prod_diabetic_shoes','Diabetic Shoes','diabetic-shoes','Therapeutic diabetic footwear for foot protection.',9500,'USD','cat_braces'],
        ['prod_raised_toilet_seat','Raised Toilet Seat','raised-toilet-seat','Raised seat to make toileting easier and safer.',3500,'USD','cat_bathing'],
        ['prod_nebulizer','Nebulizer Machine','nebulizer-machine','Portable nebulizer for respiratory therapy.',12000,'USD','cat_diabetic'],
        ['prod_walking_cane','Walking Cane','walking-cane','Adjustable walking cane with ergonomic handle.',2500,'USD','cat_mobility'],
        ['prod_bp_monitor','Blood Pressure Monitor','blood-pressure-monitor','Digital upper-arm blood pressure monitor.',4500,'USD','cat_monitoring'],
        ['prod_cgm_reader','CGM / Libre Reader','cgm-libre-reader','Continuous glucose monitor (reader device).',15000,'USD','cat_monitoring'],
        ['prod_back_brace','Back Brace','back-brace','Supportive back brace for lumbar stabilization.',6500,'USD','cat_braces'],
        ['prod_wrist_brace','Wrist Brace','wrist-brace','Adjustable wrist brace for support and recovery.',2200,'USD','cat_braces'],
        ['prod_knee_brace','Knee Brace','knee-brace','Stabilizing knee brace for post-op and sports use.',8500,'USD','cat_braces'],
        ['prod_ankle_boot','Ankle Boot','ankle-boot','Post-op ankle boot for immobilization and recovery.',5500,'USD','cat_braces'],
        ['prod_postop_shoe','Post-op Shoe','postop-shoe','Protective shoe for post-operative foot care.',4800,'USD','cat_braces'],
        ['prod_oximeter','Pulse Oximeter','pulse-oximeter','Finger pulse oximeter for SpO2 and pulse monitoring.',3000,'USD','cat_monitoring'],
        ['prod_other_dme','Other DME Supplies','other-dme-supplies','Various durable medical equipment items (excludes oxygen).',0,'USD','cat_other'],
      ];

      for (const p of products) {
        await tx`INSERT INTO "Product" (id, name, slug, "shortDescription", "priceCents", "currency", "categoryId", "createdAt", "updatedAt") VALUES (${p[0]}, ${p[1]}, ${p[2]}, ${p[3]}, ${p[4]}, ${p[5]}, ${p[6]}, NOW(), NOW()) ON CONFLICT (id) DO NOTHING;`;
      }

      // Variants (basic single variants where appropriate)
      const variants = [
        ['var_motorized_base','MWC-BASE','prod_motorized_wheelchair','Base Model',250000],
        ['var_scooter_std','SCOOTER-STD','prod_scooter_electric','Standard',120000],
        ['var_manual_std','MWC-STD','prod_manual_wheelchair','Standard',35000],
        ['var_rollator_std','ROLL-STD','prod_rollator','Standard',8500],
        ['var_walker_std','WALK-STD','prod_standard_walker','Standard',4500],
        ['var_walker_wheels','WALK-WHL','prod_walker_with_wheels','With Wheels',6500],
        ['var_bed_electric','BED-ELEC','prod_hospital_bed','Electric Adjustable',120000],
        ['var_incontinence_pack','INC-PACK','prod_incontinence_supplies','Sample Pack',2500],
        ['var_ostomy_single','OST-SGL','prod_ostomy_bag','Single',1200],
        ['var_catheter_14','CAT-14','prod_catheter','Size 14FR',800],
        ['var_shower_std','SHWR-STD','prod_shower_chair','Standard',4500],
        ['var_commode_std','COMM-STD','prod_bedside_commode','Standard',6500],
        ['var_diabetic_shoe','DSH-STD','prod_diabetic_shoes','Standard',9500],
        ['var_toilet_raised','TOIL-RAI','prod_raised_toilet_seat','Raised Seat',3500],
        ['var_neb_standard','NEB-STD','prod_nebulizer','Standard',12000],
        ['var_cane_std','CANE-STD','prod_walking_cane','Adjustable',2500],
        ['var_bp_std','BPM-STD','prod_bp_monitor','Upper Arm',4500],
        ['var_cgm_std','CGM-STD','prod_cgm_reader','Reader',15000],
        ['var_back_small','BRACE-BK','prod_back_brace','Medium',6500],
        ['var_wrist_small','BRACE-WR','prod_wrist_brace','One Size',2200],
        ['var_knee_medium','BRACE-KN','prod_knee_brace','Medium',8500],
        ['var_ankle_small','BOOT-ANK','prod_ankle_boot','Standard',5500],
        ['var_postop_shoe','PSH-STD','prod_postop_shoe','One Size',4800],
        ['var_oxi_std','OXI-STD','prod_oximeter','Standard',3000],
        ['var_other_bulk','DME-OTHER','prod_other_dme','Assorted',0],
      ];

      for (const v of variants) {
        await tx`INSERT INTO "ProductVariant" (id, sku, "productId", name, "priceCents", "createdAt", "updatedAt") VALUES (${v[0]}, ${v[1]}, ${v[2]}, ${v[3]}, ${v[4]}, NOW(), NOW()) ON CONFLICT (id) DO NOTHING;`;
      }

    });

    console.log('Direct seed completed successfully.');
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

main();
