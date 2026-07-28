export default function ResultatsNationaux({

    resultats,

    handleResultatChange,

    ajouterLigne,

    supprimerLigne

}) {

    return (

        <section className="section">

            <div className="section-title">

                2. الإنجازات في البطولات الوطنية للرياضة المدرسية

            </div>

            <table className="result-table">

                <thead>

                    <tr>

                        <th>الموسم الدراسي</th>

                        <th>الرياضة المعنية</th>

                        <th>الرتبة المحصل عليها</th>

                        <th>المكان</th>

                        <th>الإجراءات</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        resultats.map((ligne,index)=>(

                            <tr key={index}>

                                <td>

                                    <input

                                        value={ligne.saison}

                                        onChange={(e)=>

                                            handleResultatChange(

                                                index,

                                                "saison",

                                                e.target.value

                                            )

                                        }

                                    />

                                </td>

                                <td>

                                    <input

                                        value={ligne.sport}

                                        onChange={(e)=>

                                            handleResultatChange(

                                                index,

                                                "sport",

                                                e.target.value

                                            )

                                        }

                                    />

                                </td>

                                <td>

                                    <input
                                    type="number"
                                    min="1"
                                    step="1"
                                    value={ligne.classement}
                                    onChange={(e)=>
                                        handleResultatChange(
                                            index,
                                            "classement",
                                            e.target.value
                                        )
                                    }
                                    onKeyDown={(e) => {
                                        if (["e", "E", "+", "-"].includes(e.key)) {
                                            e.preventDefault();
                                        }
                                        }}
                                    />

                                </td>

                                <td>

                                    <input

                                        value={ligne.lieu}

                                        onChange={(e)=>

                                            handleResultatChange(

                                                index,

                                                "lieu",

                                                e.target.value

                                            )

                                        }

                                    />

                                </td>

                                <td>

                                    <button

                                        type="button"

                                        className="delete-line"

                                        onClick={()=>

                                            supprimerLigne(index)

                                        }

                                    >

                                        حذف

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

            <div className="table-buttons">

                <button

                    type="button"

                    className="add-line"

                    onClick={ajouterLigne}

                >

                    + إضافة سطر

                </button>

            </div>

        </section>

    );

}