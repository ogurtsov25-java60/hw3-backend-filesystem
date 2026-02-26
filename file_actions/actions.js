export function calculateTotalFares(data) {
    let totalFares = 0;
    for (const row of data) {
        if (typeof row.Fare === "number") {
            totalFares += row.Fare;
        }
    }
    return totalFares;
}

export function calculate_average_fares_by_class(data){
    const total_fares =  {
        totalFirstClass: 0,
        totalFirstClassFares: 0,
        totalSecondClass: 0,
        totalSecondClassFares: 0,
        totalThirdClass: 0,
        totalThirdClassFares: 0
    };
    for (const row of data){
        if (row.Pclass === 1){
            total_fares.totalFirstClass +=1
            total_fares.totalFirstClassFares += row.Fare
        }if (row.Pclass === 2){
            total_fares.totalSecondClass +=1
            total_fares.totalSecondClassFares += row.Fare
        }if (row.Pclass === 3){
            total_fares.totalThirdClass +=1
            total_fares.totalThirdClassFares += row.Fare
        }
    }
    return {
        firstClassAverage:
            total_fares.totalFirstClass
                ? total_fares.totalFirstClassFares / total_fares.totalFirstClass
                : 0,

        secondClassAverage:
            total_fares.totalSecondClass
                ? total_fares.totalSecondClassFares / total_fares.totalSecondClass
                : 0,

        thirdClassAverage:
            total_fares.totalThirdClass
                ? total_fares.totalThirdClassFares / total_fares.totalThirdClass
                : 0
    };
}

export function calculate_total_quantity_survived_non_survived (data){
    let survived = 0;
    let non_survived = 0;
    for (const row of data){
        if (row.Survived === 1){
            survived += 1
        }else{
            non_survived += 1
        }
    }
    return {survied: survived, non_survived: non_survived}
}


export function calculate_total_quantity_survived_non_survived_by_gender(data){
    const survived = {
        men: 0,
        woman: 0,
        children: 0
    };
    const non_survived = {
        men: 0,
        woman: 0,
        children: 0
    }
    for (const row of data){
        if (row.Survived === 1){
            if (row.Sex === "male" && row.Age>=18){
                survived.men += 1
            }
            if (row.Sex === "female" && row.Age>=18){
                survived.woman += 1
            }
            if (row.Age<18){
                non_survived.children += 1}
        }else{
            if (row.Sex === "male" && row.Age>=18){
                non_survived.men += 1
            }
            if (row.Sex === "female" && row.Age>=18){
                non_survived.woman += 1
            }
            if (row.Age<18){
                non_survived.children += 1}
        }

    }
    return {survived: survived, non_survived: non_survived}
}
