import { useState } from "react";
const Taskadder = () => {
    const [checked, setChecked] = useState(false);


    return (
        <div className="row">

            <input
                className="col"
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
            />
            <p className={`col ${checked ? "text-decoration-line-through" : ""}`}>
                this is an example of task #1.
            </p>
        </div>
    );



}

export default Taskadder;