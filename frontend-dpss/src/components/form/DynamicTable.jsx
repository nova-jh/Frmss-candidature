import "./DynamicTable.css";

function DynamicTable({
    title,
    rows,
    setRows
}) {

    const handleChange = (index, event) => {

        const values = [...rows];

        values[index][event.target.name] = event.target.value;

        setRows(values);

    };

    const ajouterLigne = () => {

        setRows([
            ...rows,
            {
                saison: "",
                typeSport: "",
                rang: null,
                lieu: ""
            }
        ]);

    };

    const supprimerLigne = (index) => {

        if (rows.length === 1) return;

        const values = [...rows];

        values.splice(index, 1);

        setRows(values);

    };

    return (

        <section className="form-section">

            <div className="section-title">

                {title}

            </div>

            <table className="sport-table">

                <thead>

                    <tr>

                        <th>الموسم الدراسي</th>

                        <th>النوع الرياضي</th>

                        <th>الرتبة المحصل عليها</th>

                        <th>المكان</th>

                        <th></th>

                    </tr>

                </thead>

                <tbody>

                    {rows.map((row, index) => (

                        <tr key={index}>

                            <td>

                                <input
                                    type="text"
                                    name="saison"
                                    value={row.saison}
                                    onChange={(e) => handleChange(index, e)}
                                />

                            </td>

                            <td>

                                <input
                                    type="text"
                                    name="typeSport"
                                    value={row.typeSport}
                                    onChange={(e) => handleChange(index, e)}
                                />

                            </td>

                            <td>

                                <input
                                    type="number"
                                    min="1"
                                    name="rang"
                                    value={row.rang ?? ""}
                                    onChange={(e) => handleChange(index, e)}
                                />

                            </td>

                            <td>

                                <input
                                    type="text"
                                    name="lieu"
                                    value={row.lieu}
                                    onChange={(e) => handleChange(index, e)}
                                />

                            </td>

                            <td>

                                <button
                                    className="delete-btn"
                                    onClick={() => supprimerLigne(index)}
                                    type="button"
                                >

                                    حذف

                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            <button
                className="add-btn"
                type="button"
                onClick={ajouterLigne}
            >

                + إضافة سطر

            </button>

        </section>

    );

}

export default DynamicTable;