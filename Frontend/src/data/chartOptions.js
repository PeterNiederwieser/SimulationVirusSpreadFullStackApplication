export const optionsPieChart = {
    title: "",
    height: 500,
    width: 550,
    colors: ["#38f5f5", "#f5e616", "#fa602d", "#7F00FF", "#000000"],
    is3D: true,
    curveType: "function",
    legend: {position: "right"},
};

export const optionsLineChart = {
    title: "New Infections / Deaths per time",
    height: 450,
    width: 550,
    colors: ["#fa602d", "#000000"],
    legend: {position: "bottom"},
    curveType: "function",
    vAxis: {minValue: 10, title: "number", titleTextStyle: {color: "#333"}},
    hAxis: {minValue: 0, title: "time", titleTextStyle: {color: "#333"}},
    chartArea: {width: "70%", height: "70%"}
};

export const optionsAreaChart = {
    title: "Total infections / deaths",
    height: 450,
    width: 550,
    colors: ["#fa602d", "#000000"],
    legend: {position: "bottom"},
    curveType: "function",
    vAxis: {minValue: 0, title: "number", titleTextStyle: {color: "#333"}},
    hAxis: {minValue: 0, title: "time", titleTextStyle: {color: "#333"}},
    chartArea: {width: "70%", height: "70%"}
};