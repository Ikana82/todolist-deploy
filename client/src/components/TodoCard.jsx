export default function TodoCard( {task, status}) { // perhatikan penulisan props pada React jangan lupa { }
  return (
    <>
      <div className="card card-dash bg-base-100 w-65">
        <div className="card-body">
          <h2 className="card-title">{task}</h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">{status}</button>
          </div>
        </div>
      </div>
    </>
  );
}
