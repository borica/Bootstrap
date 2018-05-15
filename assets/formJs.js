var currentStep = 1;

var form1 = {
    header: "Cadastro Pessoal",
    body: "#first-step-form",
    progressBar: "#progressStepOne",
    backButton: false
}

var form2 = {
    header: "Cadastro Financeiro",
    body: "#second-step-form",
    progressBar: "#progressStepTwo",
    backButton: true
}

var form3 = {
    header: "Dados Corporais",
    body: "#third-step-form",
    progressBar: "#progressStepThree",
    backButton: true
}


$('document').ready(function(){
    $.getJSON( "assets/test.json", function( data ) {
        var items = [];
        $.each( data, function( key, val ) {
            items.push( "<li id='" + key + "'>" + val + "</li>" );
        });

        $( "<ul/>", {
            "class": "my-new-list",
            html: items.join( "" )
        }).appendTo( "body" );
    });
    
    var cardHeader;
    
    $('#cardSignupHeader').text(form1.header);
    
    $('#btn-next').click(function(){
        formManager(false);
    });
    $('#btn-back').click(function(){
        formManager(true);
    });
    
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (function() {
        'use strict';
        window.addEventListener('load', function() {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        }, false);
    })();
    
    var card = new Card({
            // a selector or DOM element for the form where users will
            // be entering their information
            form: '#formControl', // *required*
            // a selector or DOM element for the container
            // where you want the card to appear
            container: '.card-wrapper', // *required*

            formSelectors: {
                numberInput: 'input#cardNumber', // optional — default input[name="number"]
                expiryInput: 'input#expiration', // optional — default input[name="expiry"]
                cvcInput: 'input#cvc', // optional — default input[name="cvc"]
                nameInput: 'input#fullName' // optional - defaults input[name="name"]
            },
            width: 350, // optional — default 350px
            formatting: true, // optional - default true
            // Strings for translation - optional
            messages: {
                validDate: 'valid\ndate', // optional - default 'valid\nthru'
                monthYear: 'mm/yyyy', // optional - default 'month/year'
            },
            // Default placeholders for rendered fields - optional
            placeholders: {
                number: '•••• •••• •••• ••••',
                name: 'Full Name',
                expiry: '••/••',
                cvc: '•••'
            },
            masks: {
                cardNumber: '•' // optional - mask card number
            },
            // if true, will log helpful messages for setting up Card
                debug: true // optional - default false
        });
});

function formManager(back){
    var element = $($('.card-body').find('div'));
    for(var i = 0; i < element.length; i++){
        if($(element[i]).hasClass("stepsActive")){
            element = element[i];
            break;
        }
    }
    var form;
    var proceed;
    
    if(!back){
        switch($(element).prop('id')){
            case 'first-step-form':
                form = form2;
                proceed = true;
            break;
            case 'second-step-form':
                form = form3;
                proceed = true;
            break;
        }
    }else if(back){
        switch($(element).attr('id')){
            case 'second-step-form':
                form = form1;
                proceed = true;
            break;
            case 'third-step-form':
                form = form2;
                proceed = true;
            break;
        }
    }
    if(proceed == true){
        $(element).fadeOut(200, function(){
            cardHeader = form.header;
            $('#cardSignupHeader').text(cardHeader);
            if(form.body == "#first-step-form"){
                $(form2.progressBar).addClass('invisible');
                $(form3.progressBar).addClass('invisible');
            }else if(form.body == "#second-step-form"){
                $(form2.progressBar).removeClass('invisible');
                $(form3.progressBar).addClass('invisible');
            }else{
                $(form3.progressBar).removeClass('invisible');
            }
            
            if(form.backButton){
                $('#btn-back').removeClass('invisible');
            }else{
                $('#btn-back').addClass('invisible');
            }
            $(form.body).fadeIn(200);
            $(element).removeClass('stepsActive');
            $(form.body).addClass('stepsActive');
        });
    }
    
}
