export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  center?: boolean
}) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && <span className="badge">{eyebrow}</span>}
      <h2 className="h-section mt-4">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-slate-600">{subtitle}</p>}
    </div>
  )
}
