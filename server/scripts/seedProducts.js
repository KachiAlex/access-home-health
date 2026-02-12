#!/usr/bin/env node
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

import { db } from '../src/config/firebase.js'

const products = [
  { name: 'Motorized wheelchairs', price: 2499.99, category: 'Mobility', stock: 5 },
  { name: 'Scooters/electric wheelchairs', price: 1999.99, category: 'Mobility', stock: 6 },
  { name: 'Manual wheelchairs', price: 349.99, category: 'Mobility', stock: 20 },
  { name: 'Rollator walkers', price: 79.99, category: 'Walking Aids', stock: 30 },
  { name: 'Standard walkers', price: 39.99, category: 'Walking Aids', stock: 40 },
  { name: 'Walker with wheels', price: 59.99, category: 'Walking Aids', stock: 35 },
  { name: 'Hospital beds', price: 899.99, category: 'Beds', stock: 8 },
  { name: 'Incontinence supplies', price: 24.99, category: 'Incontinence', stock: 200 },
  { name: 'Ostomy bags', price: 29.99, category: 'Incontinence', stock: 150 },
  { name: 'Catheters', price: 12.99, category: 'Urology', stock: 300 },
  { name: 'Shower chairs', price: 69.99, category: 'Bath Safety', stock: 50 },
  { name: 'Bedside commodes', price: 89.99, category: 'Bath Safety', stock: 45 },
  { name: 'Diabetic Shoes', price: 129.99, category: 'Diabetes', stock: 25 },
  { name: 'Raised toilet seats', price: 39.99, category: 'Bath Safety', stock: 60 },
  { name: 'Nebulizer machine', price: 69.99, category: 'Respiratory', stock: 40 },
  { name: 'Walking canes', price: 19.99, category: 'Walking Aids', stock: 120 },
  { name: 'Blood pressure monitors', price: 49.99, category: 'Monitoring', stock: 80 },
  { name: 'CGM/Libre diabetic machine', price: 199.99, category: 'Diabetes', stock: 30 },
  { name: 'Back brace', price: 59.99, category: 'Braces', stock: 70 },
  { name: 'Wrist brace', price: 19.99, category: 'Braces', stock: 100 },
  { name: 'Knee brace and all other braces', price: 79.99, category: 'Braces', stock: 60 },
  { name: 'Ankle boots', price: 89.99, category: 'Footwear', stock: 40 },
  { name: 'Post-op shoe', price: 59.99, category: 'Footwear', stock: 35 },
  { name: 'Oximeter', price: 29.99, category: 'Monitoring', stock: 150 },
]

async function upsertProduct(p) {
  const snapshot = await db.collection('products').where('name', '==', p.name).get()
  const now = new Date()
  if (!snapshot.empty) {
    const doc = snapshot.docs[0]
    await db.collection('products').doc(doc.id).update({
      ...p,
      price: parseFloat(p.price),
      stock: parseInt(p.stock, 10),
      updatedAt: now,
    })
    console.log(`Updated product: ${p.name}`)
  } else {
    const docRef = await db.collection('products').add({
      ...p,
      price: parseFloat(p.price),
      stock: parseInt(p.stock, 10),
      description: p.description || '',
      image: p.image || '',
      createdAt: now,
      updatedAt: now,
    })
    console.log(`Created product: ${p.name} (id=${docRef.id})`)
  }
}

async function run() {
  try {
    console.log('Seeding products...')
    for (const p of products) {
      await upsertProduct(p)
    }
    console.log('Done seeding products.')
    process.exit(0)
  } catch (err) {
    console.error('Seeding failed', err)
    process.exit(1)
  }
}

if (require.main === module) run()
