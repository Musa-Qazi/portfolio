interface ProjectPreview {
  name: string;
  category: string;
  domain: string;
  features: string[];
}

interface Props {
  project: ProjectPreview;
  index: number;
  image?: string;
  alt?: string;
  link?: string;
}

const WorkImage = ({ project, index, image, alt, link }: Props) => {
  const preview = image ? (
    <img src={image} alt={alt ?? `${project.name} preview`} loading="lazy" />
  ) : (
    <div
      className={`work-image-in project-preview project-preview--${["blue", "lilac", "mint"][index % 3]}`}
      role="img"
      aria-label={`${project.name}: ${project.domain}`}
    >
      <div className="project-preview-meta">
        <span>{project.category}</span>
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <p className="project-preview-domain">{project.domain}</p>
      <h4 className="project-preview-title">{project.name}</h4>
      <ul className="project-preview-features" aria-hidden="true">
        {project.features.slice(0, 3).map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <div className="project-preview-orbit" aria-hidden="true" />
    </div>
  );

  return (
    <div className="work-image">
      {link ? (
        <a className="work-image-in" href={link} target="_blank" rel="noreferrer">
          {preview}
        </a>
      ) : (
        preview
      )}
    </div>
  );
};

export default WorkImage;
