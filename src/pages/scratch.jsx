import React, { useState } from "react";
import Papa from "papaparse";

function CsvTable() {
    const [data, setData] = useState([]);
    const [headers, setHeaders] = useState([]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                setData(results.data);
                setHeaders(Object.keys(results.data[0]));
            },
        });
    };

    return (
        <div>
            <h2>Upload CSV</h2>
            <input type="file" accept=".csv" onChange={handleFileUpload} />

            {data.length > 0 && (
                <table border="1" style={{ marginTop: "20px" }}>
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {headers.map((header, colIndex) => (
                                    <td key={colIndex}>{row[header]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default CsvTable;