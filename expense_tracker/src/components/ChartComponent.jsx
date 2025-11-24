import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";


/**
 * @param {Object} expenses - stores data of all the expenses of a particular user
 * @returns {Jsx element} - creates a piechart and return the component 
 */

export default function ChartComponent({ expenses }) {
    const data = [];// stores object ,which contains data of name of the catrgory and total expenses of that category 

    const categories = {}; // used to store total expenses of each category 

    expenses.forEach((item) => { // foreach method using which we are going to find the total amount of each category 
        if (!categories[item.category]) {
            categories[item.category] = 0; // if the entry is not there in the categories then it is appended into the object with initial value of 0
        }
        categories[item.category] += Number(item.amount);
    });

    for (let c in categories) { // for loop to append the data regarding total amount of each category with name 
        data.push({
            name: c,
            value: categories[c],
        });
    }

    const colors = [
        "#2563eb",
        "#f43f5e",
        "#10b981",
        "#f59e0b",
        "#6366f1",
        "#ec4899",
        "#14b8a6",
        "#a855f7",
        "#ef4444",
        "#84cc16",
        "#0ea5e9",
        "#d946ef"
    ];//12 unique colors for all the 12 extries which we can have in category field 


    return (
        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}>
            <PieChart width={300} height={300}>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={index} fill={colors[index % colors.length]} />//
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
}
