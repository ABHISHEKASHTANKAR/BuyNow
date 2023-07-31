export const getRandomProducts = (prodsArray, n) => {
    return prodsArray.sort(() => 0.5 - Math.random()).slice(0, n)
}


export const shortenString = (title, n) => {
    if (title.length > n) {
        return title.substring(0, n) + "...";
    }
    return title;
}

export const calculateTotal = (prodArr) => {
    let total = 0;
    for (let i = 0; i < prodArr.length; i++) {
        total += prodArr[i].price * prodArr[i].quantity;
    }
    return total;
}

export const sortProducts = (prodArr, type) => {
    if (type === 'Price Low to High') {
        const tempArr = [...prodArr];
        tempArr.sort((a, b) => a.price - b.price);
        return tempArr;
    }
    else if (type === 'Price High to Low') {
        const tempArr = [...prodArr];
        tempArr.sort((a, b) => b.price - a.price);
        return tempArr;
    }
    else if (type === 'Newest First') {
        const tempArr = [...prodArr];
        tempArr.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateA - dateB;
        });
        return tempArr;
    }
}

export const searchProducts = (prodArr, key) => {
    if (key.length > 3) {
        const searchKeyword = key.toLowerCase();

        const filteredProducts = prodArr.filter((product) =>
            product.title.toLowerCase().includes(searchKeyword)
        );

        return filteredProducts;
    }
    return prodArr;
}

export const firstName = (name) => {
    const nameArr = name.split(" ");
    return nameArr[0];
}


function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

function formatTime(hours, minutes) {
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${meridiem}`;
}

export const formatDate = (date) => {
    const inputDate = new Date(date);
    const day = inputDate.getDate();
    const daySuffix = getDaySuffix(day);

    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(inputDate);
    const formattedDay = formattedDate.replace(`${day}`, `${day}${daySuffix}`);

    const hours = inputDate.getHours();
    const minutes = inputDate.getMinutes();
    const time = formatTime(hours, minutes);
    return `${formattedDay}, ${time}`;
}