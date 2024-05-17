import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit{


    //options: string[];

    options: any[] = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' }
    ];
    selectedOption: string;

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.http.get<string[]>('https://localhost:44305/Dropdown/options')
            .subscribe(options => this.options = options);
    }



    onDropdownChange(): void {
        // Appeler votre méthode pour enregistrer le choix dans la base de données
        this.saveChoice(this.selectedOption);
    }


/*
    saveSelectedOption(): void {
        if (this.selectedOption) {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json' // Définissez le bon type de contenu ici
            });
            const options = { headers: headers };

            this.http.post('https://localhost:44305/Dropdown/save-choice', { choice: this.selectedOption }, options)
                .subscribe(
                    () => {
                        console.log('Choix enregistré avec succès');
                    },
                    (error) => {
                        console.error('Erreur lors de l\'enregistrement du choix :', error);
                    }
                );
        } else {
            console.log('Aucune option sélectionnée.');
        }
    }

    saveChoice(choice: any): void {
        this.http.post('https://localhost:44305/Dropdown/save-choice', choice.choice, {
            headers: new HttpHeaders({
                'Content-Type': 'text/plain' // Envoyez le choix en tant que chaîne de caractères
            })
        }).subscribe(
            () => {
                console.log('Choix enregistré avec succès');
            },
            (error) => {
                console.error('Erreur lors de l\'enregistrement du choix :', error);
            }
        );
    }*/
    saveSelectedOption(): void {
        if (this.selectedOption) {
            // Convertir la première lettre en majuscule
            const choiceData = { choice: this.capitalizeFirstLetter(this.selectedOption) };
            this.http.post('https://localhost:44305/Dropdown/save-choice', choiceData)
                .subscribe(
                    () => {
                        console.log('Choix enregistré avec succès');
                    },
                    (error) => {
                        console.error('Erreur lors de l\'enregistrement du choix :', error);
                    }
                );
        } else {
            console.log('Aucune option sélectionnée.');
        }
    }

    capitalizeFirstLetter(value: string): string {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }



    saveChoice(choice: string): void {
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        const options = { headers: headers };

        const formData = new FormData();
        formData.append('choice', choice);

        this.http.post('https://localhost:44305/Dropdown/save-choice', formData, options)
            .subscribe(
                () => {
                    console.log('Choix enregistré avec succès');
                },
                (error) => {
                    console.error('Erreur lors de l\'enregistrement du choix :', error);
                }
            );
    }



}
