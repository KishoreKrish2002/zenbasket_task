import { Pipe, PipeTransform } from '@angular/core';
/**
 * Pipe for format the product price
 */
@Pipe({
  name: 'formatPrice'
})
export class FormatPricePipe implements PipeTransform {
  transform(value: number, currSymbol: string = '$'): string {
    if (isNaN(value)) return ''; // Return empty string if value is not a number
    const formatedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');//format the input price and seperate with comma(,)
    return `${currSymbol}${formatedValue}`;// Return formated value
  }
}
