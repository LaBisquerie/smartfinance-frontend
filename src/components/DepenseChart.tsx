import React, { useEffect, useState, SyntheticEvent } from "react";

interface DepenseChartProps {}

const DepenseChart: React.FunctionComponent<DepenseChartProps> = () => {
    const [depenses, setDepenses] = useState();
    const [categories, setCategories] = useState<any[]|undefined>();
    const [selectedMonthValue, setSelectedMonthValue] = useState(0);
    const [selectedMonthLabel, setSelectedMonthLabel] = useState('');
    const [selectedCategoryValue, setSelectedCategoryValue] = useState(0);
    const [selectedCategoryLabel, setSelectedCategoryLabel] = useState('');

    useEffect(() => {
        fetch('http://localhost:8000/api/budgets/?type=OUTCOME')
        .then(response => response.json())
        .then(res => setDepenses(res))
        .catch(err => console.log(err))
        fetch('http://localhost:8000/api/categories/?type=OUTCOME')
        .then(response => response.json())
        .then(res => setCategories(res))
        .catch(err => console.log(err))
    }, []);

    console.log({depenses});
    console.log({categories});
    
    
    const handleSubmit = (e : SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const handleCategoryChange = (e : any) => {
        let index = e.nativeEvent.target.selectedIndex;
        let label = e.nativeEvent.target[index].text;
        let value = e.target.value;
        setSelectedCategoryValue(value);
        setSelectedCategoryLabel(label);
    } 

    const handleMonthChange = (e : any) => {
        let index = e.nativeEvent.target.selectedIndex;
        let label = e.nativeEvent.target[index].text;
        let value = e.target.value;
        setSelectedMonthValue(value);
        setSelectedMonthLabel(label);
    }

    const handleCategorySubmit = (e : SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <div className="depense-chart">
            <div className="depense-chart__header">
                <form onSubmit={handleSubmit}>
                    <select className="depense-form-item__input depense-form-item__input--select" name="selectedMonth" id="selectedMonth" onChange={handleMonthChange} value={selectedMonthValue}>
                        <option value="null">--Choisir un mois--</option>
                        <option value="1">Janvier</option>
                        <option value="2">Février</option>
                        <option value="3">Mars</option>
                        <option value="4">Avril</option>
                        <option value="5">Mai</option>
                        <option value="6">Juin</option>
                        <option value="7">Juillet</option>
                        <option value="8">Août</option>
                        <option value="9">Septembre</option>
                        <option value="10">Octobre</option>
                        <option value="11">Novembre</option>
                        <option value="12">Décembre</option>
                    </select>
                </form>
                <form onSubmit={handleCategorySubmit}>
                <select className='depense-form-item__input depense-form-item__input--select' name="selectedCategory" id="selectedCategory" onChange={handleCategoryChange} value={selectedCategoryValue}>
                    <option value="null">--Choisir une catégorie--</option>
                    {categories?.map((categorie : any) => { 
                        return (
                            <option key={categorie.id} value={categorie.id}>{categorie.nom}</option>
                        )
                    })}
                </select>
                </form>
            </div>
        </div>
    )
}

export default DepenseChart;