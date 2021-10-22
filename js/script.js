const app = {
  // élément du DOM qui contient notre interface utilisateur
  containerElement: null,
  
  // élément compteur dans le DOM
  counterElement: null,

  // on prévoit une propriété dans laquelle on va stocker les données
  // et sur lesquelles notre application se basera pour se dessiner.
  // on appelle cette propriété le state - l'état de notre application
  // c'est notre source de vérité
  state: {
    currentBase: 'JavaScript',
    currentSpeciality: 'React',
    bases: ['JavaScript', 'PHP'],
    specialities: ['Data', 'Symfony', 'React', 'WordPress'],
    teachers: [
      {
        name: 'Loris',
        base: 'PHP',
        speciality: 'WordPress',
      },
      {
        name: 'Jean',
        base: 'JavaScript',
        speciality: 'Data',
      },
      {
        name: 'Jean-Christophe',
        base: 'PHP',
        speciality: 'Symfony',
      },
      {
        name: 'Jean-Philippe',
        base: 'PHP',
        speciality: 'Symfony',
      },
      {
        name: 'Julien',
        base: 'PHP',
        speciality: 'React',
      },
      {
        name: 'Vincent',
        base: 'JavaScript',
        speciality: 'React',
      },
      {
        name: 'Tony',
        base: 'JavaScript',
        speciality: 'React',
      },
    ],
  },


  init: function() {
    app.createFinder();
  },

  createElement(tag, parent, options){
    const createdElement = document.createElement(tag);
    
    // pour chacune des propriété de l'objet d'option
    // on positionne la propriété correspondante dans l'élément créé
    for (const prop in options){
      // la notation "tableau" permet d'accéder dynamiquement 
      createdElement[prop] = options[prop];
    }

    //formElement.className = 'search';
    parent.appendChild(createdElement);

    // on renvoir une référence à l'élément créé
    // le code appelant pourra s'en servir si besoin
    return createdElement;
  },

  createFinder: function(){
    // Ici, on va créer notre interface, le finder !

    // à la création de l'interface, on "attrappe" l'élément du DOM
    // sur lequel on va s'accrocher et on garde sa référence dans une propriété de app
    app.containerElement = document.getElementById('app');

    // losqu'on crée l'interface, on filtre notre liste de prof en fonction des critères de recherche
    app.filteredTeachers = app.state.teachers.filter(
      (teacher)  => teacher.base ===  app.state.currentBase && teacher.speciality ===  app.state.currentSpeciality
    );

    app.createForm();
    app.createCounter();
    app.createList();
  },

  createForm: function(){
    // Ici, on crée le form

    const formElement = app.createElement('form', app.containerElement, {className: 'search', id:'search-form'});

    const selectBaseElement = app.createElement('select', formElement, {name: 'selectBase', className: 'select select-base'});

    // pour chaque language de base
    app.state.bases.forEach(
      (base) => {
        // on crée une option avec comme libellé ce langage
        // se langage de base est sélectionné si c'est PHP
        app.createElement('option', selectBaseElement, { textContent: base, selected: base === app.state.currentBase});
      }
    );

    // on écoute les changement du select base
    selectBaseElement.addEventListener('change', app.handleBaseChange);

    const selectSpecialityElement = app.createElement('select', formElement, {name: 'selectSpeciality', className: 'select select-speciality'});

    app.state.specialities.forEach(
      (speciality) => {
        app.createElement('option', selectSpecialityElement, { textContent: speciality, selected: speciality === app.state.currentSpeciality});
      }
    );

    // on écoute les changement du select speciality
    selectSpecialityElement.addEventListener('change', app.handleSpecialityChange);
    
  },

  handleBaseChange: function(event){
    console.log('je gère le changement du langage de base');

    // on récupère la base sélectionnée
    const selectedBase = event.currentTarget.value;

    // Maintenant, la base, c'est ça !
    app.setCurrentBase(selectedBase);
  },


  handleSpecialityChange: function(event){
    console.log('je gère le changement du langage de spé');

    // on récupère la spé sélectionnée
    const selectedSpeciality = event.currentTarget.value;

    // Maintenant, la base, c'est ça !
    app.setCurrentSpeciality(selectedSpeciality);
  },

  setCurrentSpeciality: function (newSpeciality){
    app.state.currentSpeciality = newSpeciality;
    app.updateFinder();
  },

  setCurrentBase: function (newBase){
    app.state.currentBase = newBase;
    app.updateFinder();
  },

  updateFinder: function(){
    app.containerElement.innerHTML = '';
    app.createFinder();
  },

  getTitle: function(count){
    switch (count){
      case 0:
        return "Aucun prof trouvé";
      case 1: 
        return "1 prof trouvé";
      default:
        return `${count} profs trouvés`;
    }
  },

  createCounter: function(){
    // Ici, on crée le compteur
    const teachersCount = app.filteredTeachers.length;
    app.counterElement = app.createElement('h1', app.containerElement, {className: 'counter', textContent: app.getTitle(teachersCount)});
  },

  createList: function(){
    // Ici, on crée la liste
    const listElement = app.createElement('ul', app.containerElement, {className: 'list'});

    // on se prépare une fonction capable de créer un teacher
    const createTeacher = function(teacher){
      
      // on crée le li du prof
      const itemElement = app.createElement(
        'li', 
        listElement, 
        {
          className: 'list-item', 
          textContent: teacher.name
        }
      );

      // on crée le span pour la base
      app.createElement(
        'span',
        itemElement,
        {
          className: 'lang lang--base',
          textContent: teacher.base,
        }
      );

      // on crée le span pour la base
      app.createElement(
        'span',
        itemElement,
        {
          className: 'lang lang--speciality',
          textContent: teacher.speciality,
        }
      );


    };

    // on appelle cette fonction pour chacun des teachers présents
    // dans notre liste de profs filtrés
    app.filteredTeachers.forEach(
      (teacher) => {
        createTeacher(teacher);
      }
    );


  },

  

};

// on initialise l'app dès que le document est prêt
document.addEventListener('DOMContentLoaded', app.init);
