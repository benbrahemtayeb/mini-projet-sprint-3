import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(list: any[], filterText: String): any[] {
    
    return list ? list.filter(item =>
      item.nomJoueur.toLowerCase().includes(filterText)) : [];
  }

}
