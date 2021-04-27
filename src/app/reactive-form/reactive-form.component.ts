import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Utilisateur } from './utilisateur';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.sass']
})

export class ReactiveFormComponent implements OnInit {
  utilisateurs: Array<Utilisateur> = []
  formulaireEnvoyee: Boolean = false;
  premierSubmit: Boolean = false;

  constructor(private fb: FormBuilder) { }

  formulaire = this.fb.group({
    prenom: ['',[Validators.required, Validators.pattern('[A-Z]?[a-z]+')]],
    nom: ['', [Validators.required, Validators.pattern('[A-Z]?[a-zA-Z -]+')]],
    email: ['',[Validators.required,Validators.email]],
    age: ['', [Validators.required, Validators.pattern('(0|[1-9])[0-9]*'), Validators.min(0)]],
  })

  // Getteur
  get prenom(){

    return this.formulaire.get('prenom');
  }

  get nom(){

    return this.formulaire.get('nom');
  }

  get email(){

    return this.formulaire.get('email');
  }

  get age(){

    return this.formulaire.get('age');
  }

  get everyFieldValid(){

    if(this.prenom?.valid && this.nom?.valid && this.email?.valid && this.age?.valid){

      return true;
    }
    return false;
  }

  // Fonction appelé lors de la soumission du formulaire
  submit(){

    if(this.everyFieldValid){

      this.premierSubmit = true;
      this.formulaireEnvoyee = true;
      const nouveauUtilisateur = new Utilisateur(this.prenom?.value,this.nom?.value,this.email?.value,this.age?.value);
      this.utilisateurs.push(nouveauUtilisateur);
    }
  }

  // Reset des valeurs de chaque input du formulaire (pas demandé)
  clear(){

    this.formulaire.reset();
    this.formulaireEnvoyee = false;
  }

  ngOnInit(): void {}

}
