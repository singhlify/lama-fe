import Link from "next/link";

export const Card = ({ title = "", description = "", redirectUrl = "" }) => {
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <div className="card-body">
        {title && <h2 className="card-title">{title}</h2>}
        {description && <p>{description}</p>}
        <div className="card-actions justify-end">
          <Link href={redirectUrl}>
            <button className="btn btn-primary">Open</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
