'use client';

import { FaqAccordion, type FaqItem } from '@/components/ui/faq-accordion';

const FAQS: FaqItem[] = [
	{
		question: 'Will everyone be able to attend the wedding ceremony?',
		answer:
			"Our civil ceremony will be held at the court with limited seating, so only a small group of immediate family and selected guests will be present.\n\nWe’re excited to celebrate with everyone during the reception, where all our invited guests are welcome!",
	},
	{
		question: 'What is the theme of the wedding?',
		answer:
			'Our wedding theme is [insert theme, e.g., minimalist, garden, modern elegance].\n\nWe’ve chosen a style that reflects us, and you’ll see it come to life during the celebration.',
	},
	{
		question: 'How do I get to the venue?',
		answer:
			'For the ceremony, it will take place at [court name & location] (private and limited attendance).\n\nThe reception venue is at [venue name & address].\n\nYou can get there via:\n• Private car (parking available at [details])\n• Ride-hailing apps (Grab, etc.)\n• [Optional: Embed Google Maps link]',
	},
	{
		question: 'Do you have a gift registry?',
		answer:
			'Your presence at our celebration is already a big gift to us.\n\nHowever, if you’d like to give something, we would truly appreciate [cash gifts / monetary blessings / registry link] as we start our new chapter together.',
	},
	{
		question: 'What is the dress code?',
		answer:
			'We kindly ask our guests to come in [insert dress code: semi-formal, formal, etc.].\n\nPreferred colors: [optional color palette]\n\nWe’d love everyone to dress comfortably while still matching the vibe of the celebration.',
	},
	{
		question: 'Can I bring a plus one?',
		answer:
			'Due to limited capacity at the venue, we can only accommodate guests who are specifically listed on the invitation.\n\nThank you for understanding!',
	},
	{
		question: 'Are kids allowed?',
		answer:
			'We love your little ones, but our event will be [adults-only / kid-friendly—choose one].\n\nWe hope this gives everyone a chance to relax and enjoy the celebration.',
	},
	{
		question: 'What is the schedule for the day?',
		answer:
			'Here’s a quick overview of our wedding day:\n• Civil Ceremony (Private): [time]\n• Reception Starts: [time]\n• Program & Dinner: [time]\n• Celebration Proper: [time]\n\n(You can check the full timeline in the Day of Schedule section.)',
	},
	{
		question: 'What time should I arrive at the reception?',
		answer:
			'We recommend arriving at least 15–30 minutes before the reception starts so you don’t miss any part of the program.',
	},
	{
		question: 'Who can I contact for questions?',
		answer:
			'If you have any questions or need assistance, feel free to reach out to:\n[Name + Contact Info]',
	},
];

export default function FaqSection() {
	return (
		<section
			id="faq"
			aria-label="Questions and answers"
			className="relative overflow-hidden bg-[#f7f0e6] text-[#34271f]"
		>
			{/* background texture to match other sections */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply"
				style={{
					backgroundImage:
						'radial-gradient(rgba(52,39,31,0.22) 1px, transparent 1px)',
					backgroundSize: '18px 18px',
				}}
			/>

			<div className="container relative mx-auto px-6 py-20 sm:py-24">
				<div className="mx-auto max-w-5xl">
					<div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
						{/* Left: Hero copy */}
						<div className="lg:w-[360px] lg:flex-none lg:pt-6">
							<h2 className="font-serif text-5xl leading-[0.95] tracking-[-0.06em] sm:text-6xl">
								Questions
								<br />
								and
								<br />
								answers
							</h2>

							<p className="mt-6 max-w-sm text-sm leading-relaxed text-[#34271f]/70">
								Can’t find the answer here?
								<br />
								<a
									href="#rsvp"
									className="underline decoration-[#34271f]/30 underline-offset-4 hover:decoration-[#34271f]/60"
								>
									Reach out to us
								</a>
							</p>
						</div>

						{/* Right: Scrollable list on desktop; normal flow on mobile */}
						<div className="min-w-0 flex-1">
							<div className="rounded-2xl bg-white/35 px-6 py-2 shadow-[0_18px_50px_rgba(52,39,31,0.10)] ring-1 ring-[#34271f]/10">
								<div className="lg:max-h-[520px] lg:overflow-auto lg:pr-2">
									<FaqAccordion items={FAQS} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
