import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterName',
    pure: false
})

export class FilterNamePipe implements PipeTransform {
    transform(array: any[],fieldName: string, searchTerm: string): any {
        // filter items array, items which match and return true will be kept, false will be filtered out
        if (array) {
            return array.filter(item => item[fieldName].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
        } else {
            return null;
        }
        
    }
}