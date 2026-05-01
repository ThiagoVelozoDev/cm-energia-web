interface SectionTitleProps {
  label?: string;
  title: string;
  highlight?: string;
  description?: string;
  center?: boolean;
  dark?: boolean;
}

export default function SectionTitle({
  label,
  title,
  highlight,
  description,
  center,
  dark,
}: SectionTitleProps) {
  const headerClass = `section-header${center ? ' section-header--center' : ''}`;
  const titleClass = `section-title${dark ? ' section-title--dark' : ''}`;
  const descClass = `section-desc${dark ? ' section-desc--dark' : ''}`;

  const renderTitle = () => {
    if (!highlight) return title;
    const parts = title.split(highlight);
    return (
      <>
        {parts[0]}
        <span className="gradient-text">{highlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={headerClass}>
      {label && <p className="section-label">{label}</p>}
      <h2 className={titleClass}>{renderTitle()}</h2>
      {description && <p className={descClass}>{description}</p>}
    </div>
  );
}
