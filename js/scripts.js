$( function() {
	$.datepicker.regional['fr'] = {
		closeText: 'Fermer',
		prevText: '&#x3c;Préc',
		nextText: 'Suiv&#x3e;',
		currentText: 'Aujourd\'hui',
		monthNames: ['Janvier','Fevrier','Mars','Avril','Mai','Juin',
		'Juillet','Aout','Septembre','Octobre','Novembre','Décembre'],
		monthNamesShort: ['Jan','Fev','Mar','Avr','Mai','Jun',
		'Jul','Aou','Sep','Oct','Nov','Dec'],
		dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
		dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
		dayNamesMin: ['Di','Lu','Ma','Me','Je','Ve','Sa'],
		weekHeader: 'Sm',
		dateFormat: 'dd-mm-yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: '',
		minDate: 0,
		maxDate: '+12M +0D',
		numberOfMonths: 1,
		showButtonPanel: true/*,
		showAnim: 'fold',
		showOn: "button",
      buttonImage: "../css/images/calendar.gif",
      buttonImageOnly: true,
      buttonText: "choisir une date"*/
		};
	$.datepicker.setDefaults($.datepicker.regional['fr']);

	 
	$( "#datepicker" ).datepicker(); // datepicker
	
/*******************************************************************************/	 

	var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
   
	
/*	$( "#tags" ).autocomplete({
      source: availableTags,
		minLength: 2
    });*/
	
$( "#tags" ).autocomplete({
  source: function( request, response ) {
          var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
          response( $.grep( availableTags, function( item ){
              return matcher.test( item );
          }) );
      },
		minLength: 1
});	
	

/**********************************************************************/
	
	$.ajax( {
                  url:'../json/cities.json',
				  method: "GET",
				  dataType : "json",
				  success:function(monObjet) {
  					
				//	console.log(monObjet.length); 
						 var i = 0;
					  
					  var villes = [];
					
					  
					  	for(i=0; i<monObjet.length; i++) 
	
				
				{
					
						var obj = {};
				
				obj["ville"] = monObjet[i].name;
				obj["value"] = monObjet[i].zip;
				obj["label"] = obj["value"]+" "+obj["ville"];
				

			villes.push(obj);
					
					
					
				} // for
					  
					  console.log(villes);
			  
					  
			$( "#cp" ).autocomplete({
      		source: function( request, response ) {
          var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
          response( $.grep( villes, function( item ){
              return matcher.test( item.label );
          }) );
      },
			minLength: 1,
	select: function(event, ui) {
          

		  $("#ville").val(ui.item.ville);

      }			
				
				
				
				});	// autocomplete	  
					  
					 
                  } // success function

			  }); // ajax	
	
	
	
	
}); // ready
