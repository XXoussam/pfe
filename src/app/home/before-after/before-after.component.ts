import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-before-after',
  templateUrl: './before-after.component.html',
  styleUrls: ['./before-after.component.css']
})
export class BeforeAfterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const gazelDescription: HTMLElement | null = document.getElementById("gazelDescription");
    const text: string = "Cette œuvre d'art consiste en une représentation de gazelle, sculptée à partir de morceaux de bois recyclés, qui ont été soigneusement façonnés et assemblés pour créer une pièce unique.";
    let i: number = 0;

    function typeWriter(): void {
      if (gazelDescription && i < text.length) {
        gazelDescription.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 30);
      }
    }

    const options = {
      threshold: 0.5 // trigger when element is 50% visible
    }

    const observer = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        typeWriter();
        observer.unobserve(entries[0].target);
      }
    }, options);

    if (gazelDescription) {
      observer.observe(gazelDescription);
    }
    /************************************************************************************************/
    const tortueDescription: HTMLElement | null = document.getElementById("tortueDescription");
    const text1: string = "Cette tortue unique est le résultat de la créativité de l'artiste et de sa volonté de donner une seconde vie à des matériaux qui auraient autrement été jetés. En utilisant des bouchons de bouteille en plastique, l'artiste a créé une texture et un effet visuel intéressants pour la tortue.";
    let j: number = 0;

    function typeWriter1(): void {
      if (tortueDescription && j < text1.length) {
        tortueDescription.innerHTML += text1.charAt(j);
        j++;
        setTimeout(typeWriter1, 30);
      }
    }

    const options1 = {
      threshold: 0.5 // trigger when element is 50% visible
    }

    const observer1 = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        typeWriter1();
        observer.unobserve(entries[0].target);
      }
    }, options1);

    if (tortueDescription) {
      observer1.observe(tortueDescription);
    }
  }

}
