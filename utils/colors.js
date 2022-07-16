const colors = [
    '#395C6B',
    '#80A4ED',
    '#1F0812',
    '#7D70BA',
    '#343633',
    '#73628A',
    '#A8201A',
    '#0F8B8D',
    '#A167A5',
    '#4E5340',
    '#ED254E',
    '#82204A',
    '#558C8C',
    '#FE5F55',
    '#69353F',
    '#457B9D',
    '#433E3F',
    '#716969'
]

export default function getColor()
{
    // i need a num between 0 and color.length-1
    let max = colors.length-1;
    let min = 0;

    let random =  Math.ceil(Math.random() * (max - min + 1) + min);
    
    return colors[random];
}