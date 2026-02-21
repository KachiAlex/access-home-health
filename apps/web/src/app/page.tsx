'use client';
import { useState } from 'react';
import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { CategoryCard } from '@/components/CategoryCard';
import { ProductCard } from '@/components/ProductCard';
import { Truck, Shield, Headphones, Award } from 'lucide-react';

const categories = [
  {
    title: 'Hospital Beds',
    description: 'Full electric, semi-electric, and manual hospital beds for home care',
    imageUrl: '/images/Full-Electric-Low-Bed-2.jpg',
    productCount: 23,
  },
  {
    title: 'Wheelchairs & Mobility',
    description: 'Manual wheelchairs, power wheelchairs, and mobility scooters',
    imageUrl: '/images/Manual-Wheelchairs.jpg',
    productCount: 45,
  },
  {
    title: 'Compression Therapy',
    description: 'Compression stockings, sleeves, and lymphedema products',
    imageUrl: '/images/BSN-Jobst-UltraSheer-Graduated-Compression-Stockings.jpg',
    productCount: 67,
  },
  {
    title: 'Breast Pumps',
    description: 'Hospital grade and personal breast pumps for nursing mothers',
    imageUrl: '/images/Hospital-Grade-Breast-Pump.jpg',
    productCount: 18,
  },
];

const featuredProducts = [
  {
    name: 'Delta Ultra-Light 1000 Full Electric Low Bed',
    price: 1249.99,
    originalPrice: 1599.99,
    rating: 4.8,
    reviews: 234,
    imageUrl: '/images/Delta™-Ultra-Light-1000-Full-Electric-Low-Bed.jpg',
    badge: 'BESTSELLER',
  },
  {
    name: 'BSN Jobst UltraSheer Knee High Compression Stockings',
    price: 89.99,
    rating: 4.7,
    reviews: 156,
    imageUrl: '/images/BSN-Jobst-UltraSheer-Graduated-Compression-Stockings.jpg',
    badge: '20% OFF',
  },
  {
    name: 'Drive Full Electric Low Height Bed',
    price: 1099.99,
    originalPrice: 1399.99,
    rating: 4.9,
    reviews: 89,
    imageUrl: '/images/Drive-Full-Electric-Low-Height-Bed.jpg',
  },
  {
    name: 'Ameda One Hand Manual Breast Pump',
    price: 34.99,
    rating: 4.6,
    reviews: 67,
    imageUrl: '/images/Ameda-One-Hand-Manual-Breast-Pump-with-Flexishield.jpg',
    badge: 'NEW',
  },
  {
    name: 'Competitor Semi-Electric Bed',
    price: 899.99,
    originalPrice: 1199.99,
    rating: 4.5,
    reviews: 123,
    imageUrl: '/images/Competitor™-Semi-Electric-Bed.jpg',
    badge: '25% OFF',
  },
  {
    name: 'JOBST Bella Lite Compression Stockings',
    price: 124.99,
    rating: 4.8,
    reviews: 201,
    imageUrl: '/images/JOBST®-Bella-Lite.jpg',
  },
  {
    name: 'GentleFeed Dual Channel Breast Pump',
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.7,
    reviews: 94,
    imageUrl: '/images/GentleFeed-Dual-Channel-Breast-Pump.jpg',
    badge: 'SALE',
  },
  {
    name: 'Full Electric Bariatric Bed 42"',
    price: 2899.99,
    rating: 4.9,
    reviews: 45,
    imageUrl: '/images/Full-Electric-Bariatric-Bed-42.jpg',
    badge: 'PREMIUM',
  },
];

export default function Home() {
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (form: HTMLFormElement) => {
    const formData = new FormData(form);

    const getAllChecked = (name: string) => formData.getAll(name).map(String);
    const payload = {
      date: formData.get('date') || '',
      staffMember: formData.get('staffMember') || '',
      callerName: formData.get('callerName') || '',
      relationship: formData.get('relationship') || '',
      phone: formData.get('phone') || '',
      email: formData.get('email') || '',
      addressStreet: formData.get('addressStreet') || '',
      addressCity: formData.get('addressCity') || '',
      addressZip: formData.get('addressZip') || '',
      heardAbout: formData.get('heardAbout') || '',
      livingSituation: getAllChecked('livingSituation'),
      clientNeeds: getAllChecked('clientNeeds'),
      clientNeedsNotes: formData.get('clientNeedsNotes') || '',
      primaryDiagnosis: formData.get('primaryDiagnosis') || '',
      primaryReasonCare: formData.get('primaryReasonCare') || '',
      callerImportant: formData.get('callerImportant') || '',
      proposedSchedule: {
        mon: formData.get('mon') || '',
        tue: formData.get('tue') || '',
        wed: formData.get('wed') || '',
        thur: formData.get('thur') || '',
        fri: formData.get('fri') || '',
        sat: formData.get('sat') || '',
        sun: formData.get('sun') || '',
        anticipatedStartDate: formData.get('anticipatedStartDate') || '',
        hoursPerWeek: formData.get('hoursPerWeek') || '',
      },
      sourceOfPayment: getAllChecked('sourceOfPayment'),
      paymentComments: formData.get('paymentComments') || '',
      inHomeConsultation: {
        date: formData.get('consultDate') || '',
        time: formData.get('consultTime') || '',
        location: formData.get('consultLocation') || '',
        meetingWith: formData.get('meetingWith') || '',
      },
      consultationNotScheduled: {
        reason: formData.get('notScheduledReason') || '',
        followUpDate: formData.get('followUpDate') || '',
        followUpTime: formData.get('followUpTime') || '',
        preferredMethod: getAllChecked('preferredMethod'),
      },
      additionalComments: formData.get('additionalComments') || '',
    };

    setSubmitting(true);
    setSubmitResult('idle');
    setSubmitError('');
    try {
      const res = await fetch('/api/homecare-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Submission failed');
      }
      form.reset();
      setSubmitResult('success');
    } catch (err: any) {
      setSubmitResult('error');
      setSubmitError(err?.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero />

      <main>
        {/* Home Care CTA + Intake Form */}
        <section className="bg-gradient-to-b from-blue-50 via-white to-white py-16">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.35em] text-blue-500">Home Care</p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Compassionate caregivers who bring hospital-grade support to your home.
                </h2>
                <p className="text-lg text-gray-700">
                  Access Home Health &amp; Medical Supplies now provides licensed caregivers, skilled nursing,
                  therapy, and daily living support. We coordinate equipment, supplies, and clinical staff so families
                  can focus on recovery—not logistics.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" /> Personal care (bathing, grooming, meal prep)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" /> Skilled visits (wound care, medication management, vitals)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" /> Therapy coordination (PT/OT), mobility &amp; safety assessments
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" /> Insurance navigation and physician coordination
                  </li>
                </ul>
                <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm text-sm text-gray-700">
                  Share a few details below and our intake team will call within one business day to confirm eligibility,
                  schedule, and equipment needs.
                </div>
              </div>

              <form
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(e.currentTarget);
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 w-full">
                    <label className="text-sm font-medium text-gray-800">Date</label>
                    <input
                      type="date"
                      name="date"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                  <div className="space-y-1 w-full">
                    <label className="text-sm font-medium text-gray-800">Staff Member</label>
                    <input
                      type="text"
                      name="staffMember"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      placeholder="Name"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-800">Caller’s Name</label>
                    <input
                      type="text"
                      name="callerName"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-800">Relationship to client</label>
                    <input
                      type="text"
                      name="relationship"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-800">Phone #</label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-800">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-medium text-gray-800">Client address (collect when scheduling home visit)</label>
                    <div className="space-y-2">
                      <input
                        type="text"
                        name="addressStreet"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        placeholder="Street"
                      />
                      <div className="grid gap-2 md:grid-cols-2">
                        <input
                          type="text"
                          name="addressCity"
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                          placeholder="City"
                        />
                        <input
                          type="text"
                          name="addressZip"
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                          placeholder="Zip"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-800">How did the prospect hear about your agency?</label>
                  <input
                    type="text"
                    name="heardAbout"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-800">Living Situation</label>
                  <div className="grid gap-2 md:grid-cols-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <input name="livingSituation" value="Home / Lives Alone" type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600" />
                      <span>Home / Lives Alone</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <input name="livingSituation" value="Home / With Spouse or Child" type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600" />
                      <span>Home / With Spouse or Child</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <input name="livingSituation" value="Care Facility" type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600" />
                      <span>Care Facility</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-800">Client Needs</label>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                    {[
                      'Bathing',
                      'Dressing',
                      'Feeding',
                      'Toileting',
                      'Mobility',
                      'Housekeeping',
                      'Transportation',
                      'Shopping/Errands',
                      'Companionship',
                      'Other',
                    ].map((need) => (
                      <label key={need} className="flex items-center gap-2">
                        <input name="clientNeeds" value={need} type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600" />
                        <span>{need}</span>
                      </label>
                    ))}
                  </div>
                  <textarea
                    rows={3}
                    name="clientNeedsNotes"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="Notes / details"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-800">Primary Diagnosis (if provided)</label>
                  <textarea
                    rows={2}
                    name="primaryDiagnosis"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-800">Primary Reason Care is Needed</label>
                  <textarea
                    rows={2}
                    name="primaryReasonCare"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-800">What is most important to the caller when selecting a home care agency?</label>
                  <textarea
                    rows={2}
                    name="callerImportant"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-800">Proposed Schedule</label>
                  <div className="grid gap-2 md:grid-cols-2">
                    {['Mon','Tue','Wed','Thur','Fri','Sat','Sun'].map((day) => (
                      <input
                        key={day}
                        type="text"
                        name={day.toLowerCase()}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        placeholder={`${day}`}
                      />
                    ))}
                  </div>
                  <div className="grid gap-2 md:grid-cols-2">
                    <input
                      type="date"
                      name="anticipatedStartDate"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      placeholder="Anticipated Start Date"
                    />
                    <input
                      type="text"
                      name="hoursPerWeek"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      placeholder="Hours Per Week"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-800">Source of Payment</label>
                  <div className="grid gap-2 md:grid-cols-2">
                    {['Private Pay','LTC Insurance','Veterans Benefits','Medicaid'].map((payer) => (
                      <label key={payer} className="flex items-center gap-2 text-sm text-gray-700">
                        <input name="sourceOfPayment" value={payer} type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600" />
                        <span>{payer}</span>
                      </label>
                    ))}
                  </div>
                  <textarea
                    rows={2}
                    name="paymentComments"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="Other / Comments"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-800">In-Home Consultation</label>
                  <div className="grid gap-2 md:grid-cols-3">
                    <input
                      type="date"
                      name="consultDate"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      placeholder="Date"
                    />
                    <input
                      type="time"
                      name="consultTime"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      placeholder="Time"
                    />
                    <input
                      type="text"
                      name="consultLocation"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      placeholder="Location"
                    />
                  </div>
                  <input
                    type="text"
                    name="meetingWith"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="Who will you be meeting with?"
                  />
                  <p className="text-xs text-gray-500">
                    Important: Provide the caller with next steps and what to expect at the in-home consultation. Be sure to tell them who will
                    be coming to see them (name and role with the company).
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-800">If In-Home Consultation Was Not Scheduled</label>
                  <input
                    type="text"
                    name="notScheduledReason"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="Reason"
                  />
                  <div className="grid gap-2 md:grid-cols-2">
                    <input
                      type="date"
                      name="followUpDate"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      placeholder="Follow-up Date"
                    />
                    <input
                      type="time"
                      name="followUpTime"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      placeholder="Follow-up Time"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-800">Client’s preferred method</p>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-700">
                      {['Phone Call','Text','Email'].map((method) => (
                        <label key={method} className="inline-flex items-center gap-2">
                          <input name="preferredMethod" value={method} type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600" />
                          <span>{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-800">Additional Comments / Notes</label>
                  <textarea
                    rows={3}
                    name="additionalComments"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="pt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-gray-500">Submitting does not place an order. We’ll confirm by phone.</p>
                  <div className="flex items-center gap-3">
                    {submitResult === 'success' && <span className="text-sm text-green-600">Submitted</span>}
                    {submitResult === 'error' && (
                      <span className="text-sm text-red-600">{submitError || 'Submission failed'}</span>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-60"
                    >
                      {submitting ? 'Sending…' : 'Send to Intake Team'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Container>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white border-y">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Free Shipping</h3>
                  <p className="text-sm text-gray-600">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Secure Payment</h3>
                  <p className="text-sm text-gray-600">100% secure transactions</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Headphones className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">24/7 Support</h3>
                  <p className="text-sm text-gray-600">Dedicated customer care</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Certified Products</h3>
                  <p className="text-sm text-gray-600">FDA approved equipment</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Shop by Category
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Browse our wide selection of medical equipment and healthcare supplies
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <CategoryCard key={index} {...category} />
              ))}
            </div>
          </Container>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 bg-white">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our most popular medical equipment and supplies
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
            </div>
          </Container>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-blue-600 text-white">
          <Container>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why Choose Access Home Health?
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xl">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Expert Consultation</h3>
                      <p className="text-blue-100">
                        Our healthcare specialists help you choose the right equipment for your needs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xl">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Quality Assurance</h3>
                      <p className="text-blue-100">
                        All products are FDA approved and meet the highest industry standards
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xl">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Fast & Reliable Delivery</h3>
                      <p className="text-blue-100">
                        Quick delivery with professional setup and installation services
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xl">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Insurance Support</h3>
                      <p className="text-blue-100">
                        We work with most insurance providers to make healthcare affordable
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="w-full h-96 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-white/50">Image Placeholder</span>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
}
