import "./StatusSelect.css";

export default function StatusSelect({ value, onChange }) {

    return (

        <select
            className="status-select"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >

            <option value="EN_ATTENTE">
                في انتظار المعالجة
            </option>

            <option value="ACCEPTEE">
                مقبولة
            </option>

            <option value="REFUSEE">
                مرفوضة
            </option>

        </select>

    );

}