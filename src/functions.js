// Limit Title
export const limitTitle = (title, limit = 20) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')} ...`;
    }
    return title;
};

// Limit Number
export const limitNumber = (title) => {
    return title.toString().slice(-5);
};

// Reload onClick
export const onReloadClick = async () => {
    await window.location.reload();
};