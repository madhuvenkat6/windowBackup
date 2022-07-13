
 edi = CKEDITOR.on('instanceCreated', function (e) {
    document.getElementById('question_preview').innerHTML = e.editor.getData();

});

function insertIntoQuestionText(from) {
    var str = CKEDITOR.instances.editor.getData();

    //var str_changed = str.replace(new RegExp("\"",'g'), "\'");
    //CKEDITOR.instances['question_question_text'].insertText(str);
    $("#question_preview").html(str);
    $("#question_preview img.mathImg").replaceWith(function (i, v) {
        return $('<span/>', {
            class: $(this).attr('class'),
            text: this.title
        });
    });

    make_mathable();


    //CKEDITOR.instances['question_question_text'].setData(str_changed);
}

function insertIntoQuestionSolutionText(from) {
    var str = CKEDITOR.instances.question_solution_editor.getData();

    //var str_changed = str.replace(new RegExp("\"",'g'), "\'");
    //CKEDITOR.instances['question_question_text'].insertText(str);
    $("#question_solution_preview").html(str);
    $("#question_solution_preview img.mathImg").replaceWith(function (i, v) {
        return $('<span/>', {
            class: $(this).attr('class'),
            text: this.title
        });
    });

    make_mathable_question_solution();


    //CKEDITOR.instances['question_question_text'].setData(str_changed);
}

function insertIntoQuestionDistractorText(from) {
    var editor_id = from;
    var question_dist_preview = "question_distractor_preview";
    var str = CKEDITOR.instances[editor_id].getData();

    //var str_changed = str.replace(new RegExp("\"",'g'), "\'");
    //CKEDITOR.instances['question_question_text'].insertText(str);
    $("#"+question_dist_preview).html(str);
    $("#"+question_dist_preview+" img.mathImg").replaceWith(function (i, v) {
        return $('<span/>', {
            class: $(this).attr('class'),
            text: this.title
        });
    });

    make_mathable_choice(question_dist_preview);

    //CKEDITOR.instances['question_question_text'].setData(str_changed);
}

function insertIntoQuestionFeedback(from) {
    var editor_id = from;
    var question_feedback_preview = "question_feedback_preview";
    var str = CKEDITOR.instances[editor_id].getData();

    //var str_changed = str.replace(new RegExp("\"",'g'), "\'");
    //CKEDITOR.instances['question_question_text'].insertText(str);
    $("#"+question_feedback_preview).html(str);
    $("#"+question_feedback_preview+" img.mathImg").replaceWith(function (i, v) {
        return $('<span/>', {
            class: $(this).attr('class'),
            text: this.title
        });
    });

    make_mathable_choice(question_feedback_preview);

    //CKEDITOR.instances['question_question_text'].setData(str_changed);
}

function insertIntoChoiceText(from) {
    var editor_id = from;
    var choice_preview = "choice_preview_"+from;
    var str = CKEDITOR.instances[editor_id].getData();
    //var str_changed = str.replace(new RegExp("\"",'g'), "\'");
    //CKEDITOR.instances['question_question_text'].insertText(str);
    $("#"+choice_preview).html(str);
    $("#"+choice_preview+" img.mathImg").replaceWith(function (i, v) {
        return $('<span/>', {
            class: $(this).attr('class'),
            text: this.title
        });
    });

    make_mathable_choice(choice_preview);

    //CKEDITOR.instances['question_question_text'].setData(str_changed);
}

function insertIntoSolutionText(from) {
    var editor_id = from;
    var solution_preview = "solution_preview_"+from;
    var str = CKEDITOR.instances[editor_id].getData();
    //var str_changed = str.replace(new RegExp("\"",'g'), "\'");
    //CKEDITOR.instances['question_question_text'].insertText(str);
    $("#"+solution_preview).html(str);
    $("#"+solution_preview+" img.mathImg").replaceWith(function (i, v) {
        return $('<span/>', {
            class: $(this).attr('class'),
            text: this.title
        });
    });
    make_mathable_choice(solution_preview);

    //CKEDITOR.instances['question_question_text'].setData(str_changed);
}

function insertIntoDistractorText(from) {
    var editor_id = from;
    var distractor_preview = "distractor_preview_"+from;
    var str = CKEDITOR.instances[editor_id].getData();
    //var str_changed = str.replace(new RegExp("\"",'g'), "\'");
    //CKEDITOR.instances['question_question_text'].insertText(str);
    $("#"+distractor_preview).html(str);
    $("#"+distractor_preview+" img.mathImg").replaceWith(function (i, v) {
        return $('<span/>', {
            class: $(this).attr('class'),
            text: this.title
        });
    });

    make_mathable_choice(distractor_preview);

    //CKEDITOR.instances['question_question_text'].setData(str_changed);
}


function deselect2(e) {
    $('.pop2').slideFadeToggle(function () {
        e.removeClass('selected');

    });
}

$(function () {
   
    $('#ck_editor').on('click', function () {
        if ($(this).hasClass('selected')) {
            deselect2($(this));
        } else {
            $(this).addClass('selected');
            $('.pop2').slideFadeToggle();
        }
        return false;
    });
    
    $('.close_ck_edit').on('click', function () {
        console.log("close ckeditor");
        deselect2($('#ck_editor'));
        return false;
    });
});

$.fn.slideFadeToggle = function (easing, callback) {
    return this.animate({opacity: 'toggle', height: 'toggle'}, 'fast', easing, callback);
};
function make_mathable() {
    $("#question_preview span.mathImg").each(function () {
        if ($(this).hasClass('mathquill-editable')) {
            $(this).mathquill("editable");
        } else {
            $(this).mathquill();
        }
    });
}

function make_mathable_question_solution() {
    $("#question_solution_preview span.mathImg").each(function () {
        if ($(this).hasClass('mathquill-editable')) {
            $(this).mathquill("editable");
        } else {
            $(this).mathquill();
        }
    });
}

function make_mathable_choice(preview) {
    var preview = preview;
    $("#"+preview+" span.mathImg").each(function () {
        if ($(this).hasClass('mathquill-editable')) {
            $(this).mathquill("editable");
        } else {
            $(this).mathquill();
        }
    });
}


$("#verify").hide();



//---validate the question form before storing to db
var serialised_arr = [];
var equation_array = [];
var question_solution_array = [];
var choice1_array = [];
var choice2_array = [];
var choice3_array = [];
var choice4_array = [];
var dist1_array = [];
var dist2_array = [];
var dist3_array = [];
var dist4_array = [];
var sol1_array = [];
var sol2_array = [];
var sol3_array = [];
var sol4_array = [];
function question_validate(from) {
    var errors = [];
    var correct_incorrect = [];
    var choices = [];
    var correct;
    var correct_choice_text;
    var correct_option;
    //if (!$.trim($("#cke_question_question_text iframe").contents().find("body").text()).length) { // zero-length string AFTER a trim
    //    errors.push("Please Enter Question text");
    //}
    if(from!="backup" && from!="exercise" && from ==="main_question" && from!="training" && from!="training_module" && from!="reasoning" &&from!="assessment"){
    if ($("#grades").val() === "") {
        errors.push("Please select Grade.");
    }
    if ($("#category_id").val() === "") {
        errors.push("Please select Category.");
    }
    if ($("#sub_category_id").val() === "") {
        errors.push("Please select SubCategory.");
    }
    if ($("#objective_id").val() === "") {
        errors.push("Please select Objective.");
    }
    }
    
    if(from==="exercise" || from ==="exercise_edit" || from ==="main_question" || from ==="assessment"){
    if ($("#grades").val() === "") {
        errors.push("Please select Grade.");
    }
    if ($("#sub_concept_id").val() === "") {
        errors.push("Please select SubConcept.");
    }
    if (from !=="assessment" && $("#exercise_id").val() === "") {
        errors.push("Please select Exercise.");
    }
    if ($("#stages").val() === "") {
        errors.push("Please select Stage.");
    }
    
    }
    if(from === "training"){
       if ($("#training_question_training_id").val() === "") {
        errors.push("Please select the Topic.");
    } 
    }
    if(from === "training_module"){
       if ($("#blc_training_module_question_blc_training_module_id").val() === "") {
        errors.push("Please select the Module.");
    } 
    }
    if(from !=="exercise_edit"){
    if (!$.trim($("#question_preview").html()).length) { // zero-length string AFTER a trim
        console.log($("#question_preview").html());
        errors.push("Please Enter Question text");
    }
    if (from === "backup" || from === "training" || from === "training_module") {
                if (($("#choice_editor_0").val().length > 0) && !$.trim($("#choice_preview_choice_editor_0").html()).length) { // zero-length string AFTER a trim
                    errors.push("Please Enter Choice1 text");
                }
                if (from === "backup" && $("#choice_sub_concept_0").val() === "") {
                    errors.push("Please select SubConcept.");
                }
    }else {
        if (($("#solution_editor_0").val().length > 0) || ($("#choice_editor_0").val().length > 0)) {
            if (!$.trim($("#choice_preview_choice_editor_0").html()).length) { // zero-length string AFTER a trim
                errors.push("Please Enter Choice1 text");
            }
            if ($("#choice_sub_concept_0").val() === "") {
                errors.push("Please select SubConcept.");
            }
        }
    }

 
    if ($.trim($("#choice_preview_choice_editor_0").html()).length) {
        var choice_0_correct;
        correct_choice_text = $("#choice_preview_choice_editor_0").html();
        choices.push($("#choice_preview_choice_editor_0").html().replace(/&nbsp;/g, '').replace(/\n/g, "").replace(/\s/g, ''));
        if (from === "backup") {
            choice_0_correct = $('#question_bkup_choice_bkups_attributes_0_correct');
            correct_incorrect.push(choice_0_correct.val());
        } else if(from === "exercise"){
           choice_0_correct = $('#exercise_question_exercise_choices_attributes_0_correct')
           correct_incorrect.push(choice_0_correct.val()); 
        }else if(from === "main_question"){
           choice_0_correct = $('#question_choices_attributes_0_correct')
           correct_incorrect.push(choice_0_correct.val()); 
           
        }else if(from === "training"){
           choice_0_correct = $('#training_question_training_choices_attributes_0_correct');
           correct_incorrect.push(choice_0_correct.val()); 
           
        }else if(from === "training_module"){
           choice_0_correct = $('#blc_training_module_question_blc_training_module_choices_attributes_0_correct');
           correct_incorrect.push(choice_0_correct.val()); 
        }else if(from === "reasoning"){
           choice_0_correct = $('#reasoning_question_reasoning_choices_attributes_0_correct');
           correct_incorrect.push(choice_0_correct.val()); 
        }else if(from === "assessment"){
           choice_0_correct = $('#assessment_question_assessment_choices_attributes_0_correct');
           correct_incorrect.push(choice_0_correct.val()); 
        }else {
            choice_0_correct = $('#diagnostic_question_diagnostic_choices_attributes_0_correct');
            correct_incorrect.push(choice_0_correct.val());
            }
            
            if (choice_0_correct.val() === "true") {
            correct_choice_text = $("#choice_preview_choice_editor_0").html();
            correct_option = "Option A";
        }
         }   
    

  if( $("#choice_editor_1").length > 0){
  if( $("#choice_editor_1").val().length > 0){
    if (!$.trim($("#choice_preview_choice_editor_1").html()).length) { // zero-length string AFTER a trim
        errors.push("Please Enter Choice2 text");
    }
    if ($("#choice_sub_concept_1").val() === "") {
        errors.push("Please select SubConcept.");
    }
}
}

    if ($.trim($("#choice_preview_choice_editor_1").html()).length) {
        var choice_1_correct;
        choices.push($("#choice_preview_choice_editor_1").html().replace(/&nbsp;/g, '').replace(/\n/g, "").replace(/\s/g, ''));
        if (from === "backup") {
            choice_1_correct= $('#question_bkup_choice_bkups_attributes_1_correct');
            correct_incorrect.push(choice_1_correct.val());
        }else if(from === "exercise"){
           choice_1_correct = $('#exercise_question_exercise_choices_attributes_1_correct')
           correct_incorrect.push(choice_1_correct.val()); 
        }else if(from === "main_question"){
           choice_1_correct = $('#question_choices_attributes_1_correct')
           correct_incorrect.push(choice_1_correct.val()); 
        }else if(from === "training"){
           choice_1_correct = $('#training_question_training_choices_attributes_1_correct');
           correct_incorrect.push(choice_1_correct.val()); 
           
        }else if(from === "training_module"){
           choice_1_correct = $('#blc_training_module_question_blc_training_module_choices_attributes_1_correct');
           correct_incorrect.push(choice_1_correct.val()); 
        }else if(from === "reasoning"){
           choice_1_correct = $('#reasoning_question_reasoning_choices_attributes_1_correct');
           correct_incorrect.push(choice_1_correct.val()); 
        }else if(from === "assessment"){
           choice_1_correct = $('#assessment_question_assessment_choices_attributes_1_correct');
           correct_incorrect.push(choice_1_correct.val()); 
        } else {
            choice_1_correct= $('#diagnostic_question_diagnostic_choices_attributes_1_correct');
            correct_incorrect.push(choice_1_correct.val());
        }
        if(choice_1_correct.val() === "true"){
           correct_choice_text = $("#choice_preview_choice_editor_1").html();
           correct_option = "Option B";
        }
    }

if( $("#choice_editor_2").length > 0){
  if( $("#choice_editor_2").val().length > 0){
    if (!$.trim($("#choice_preview_choice_editor_2").html()).length) { // zero-length string AFTER a trim
        errors.push("Please Enter Choice3 text");
    }
    if ($("#choice_sub_concept_2").val() === "") {
        errors.push("Please select SubConcept.");
    }
}
}

   if ($.trim($("#choice_preview_choice_editor_2").html()).length) {
       var choice_2_correct;
       choices.push($("#choice_preview_choice_editor_2").html().replace(/&nbsp;/g, '').replace(/\n/g, "").replace(/\s/g, ''));
        if (from === "backup") {
            choice_2_correct = $('#question_bkup_choice_bkups_attributes_2_correct')
            correct_incorrect.push(choice_2_correct.val());
        } else if(from === "exercise"){
           choice_2_correct = $('#exercise_question_exercise_choices_attributes_2_correct')
           correct_incorrect.push(choice_2_correct.val()); 
        }else if(from === "main_question"){
           choice_2_correct = $('#question_choices_attributes_2_correct')
           correct_incorrect.push(choice_2_correct.val()); 
        }else if(from === "training"){
           choice_2_correct = $('#training_question_training_choices_attributes_2_correct');
           correct_incorrect.push(choice_2_correct.val()); 
           
        }else if(from === "training_module"){
           choice_2_correct = $('#blc_training_module_question_blc_training_module_choices_attributes_2_correct');
           correct_incorrect.push(choice_2_correct.val()); 
        }else if(from === "reasoning"){
           choice_2_correct = $('#reasoning_question_reasoning_choices_attributes_2_correct');
           correct_incorrect.push(choice_2_correct.val()); 
        }else if(from === "assessment"){
           choice_2_correct = $('#assessment_question_assessment_choices_attributes_2_correct');
           correct_incorrect.push(choice_2_correct.val()); 
        } 
        else {
            choice_2_correct=$('#diagnostic_question_diagnostic_choices_attributes_2_correct');
            correct_incorrect.push(choice_2_correct.val());
        }
        if(choice_2_correct.val() === "true"){
           correct_choice_text = $("#choice_preview_choice_editor_2").html();
           correct_option = "Option C";
        }
    }

if( $("#choice_editor_3").length > 0){
  if( $("#choice_editor_3").val().length > 0){
    if (!$.trim($("#choice_preview_choice_editor_3").html()).length) { // zero-length string AFTER a trim
        errors.push("Please Enter Choice4 text");
    }
    if ($("#choice_sub_concept_3").val() === "") {
        errors.push("Please select SubConcept.");
    }
}
}

    if ($.trim($("#choice_preview_choice_editor_3").html()).length) {
        var choice_3_correct;
        choices.push($("#choice_preview_choice_editor_3").html().replace(/&nbsp;/g, '').replace(/\n/g, "").replace(/\s/g, ''));
        if (from === "backup") {
            choice_3_correct=$('#question_bkup_choice_bkups_attributes_3_correct');
            correct_incorrect.push(choice_3_correct.val());
        }else if(from === "exercise"){
           choice_3_correct = $('#exercise_question_exercise_choices_attributes_3_correct')
           correct_incorrect.push(choice_3_correct.val()); 
        }else if(from === "main_question"){
           choice_3_correct = $('#question_choices_attributes_3_correct')
           correct_incorrect.push(choice_3_correct.val()); 
        }else if(from === "training"){
           choice_3_correct = $('#training_question_training_choices_attributes_3_correct');
           correct_incorrect.push(choice_3_correct.val()); 
           
        }else if(from === "training_module"){
           choice_3_correct = $('#blc_training_module_question_blc_training_module_choices_attributes_3_correct');
           correct_incorrect.push(choice_3_correct.val()); 
        }else if(from === "reasoning"){
           choice_3_correct = $('#reasoning_question_reasoning_choices_attributes_3_correct');
           correct_incorrect.push(choice_3_correct.val()); 
        }else if(from === "assessment"){
           choice_3_correct = $('#assessment_question_assessment_choices_attributes_3_correct');
           correct_incorrect.push(choice_3_correct.val()); 
        }  else {
            choice_3_correct = $('#diagnostic_question_diagnostic_choices_attributes_3_correct');
            correct_incorrect.push(choice_3_correct.val());
        }
        if(choice_3_correct.val() === "true"){
           correct_choice_text = $("#choice_preview_choice_editor_3").html();
           correct_option = "Option D";
        }
    }
    
    if (correct_incorrect.length > 0) {
        if ($.inArray('true', correct_incorrect) === -1)
        {
            errors.push("Please select True atlest for one choice");
        }
    }
    
//    if (from === "backup") {

// Need to uncomment to check same choices starts

//    var new_choices = jQuery.grep(choices, function(n){ return (n); });
//    if (new_choices.length > 0) {
//        var recipientsArray = new_choices.sort();
//
//        var reportRecipientsDuplicate = [];
//        for (var i = 0; i < recipientsArray.length - 1; i++) {
//            if (recipientsArray[i + 1] === recipientsArray[i]) {
//                reportRecipientsDuplicate.push(recipientsArray[i]);
//            }
//        }
//        if(reportRecipientsDuplicate.length > 0){
//            errors.push("More than one choice having the same content. Please correct it.");
//        }
//    }
    
// Need to uncomment to check same choices ends   
    
//    }

    if (!errors.length) {
        //zero              
        console.log('no errors');
        $('.errors_questions').html('');

//make serialised array
        serialised_arr = $("#question_preview").find('input,select').serialize();
        console.log(serialised_arr);

        //CKEDITOR.instances['question_question_text'].setData($("#question_preview").html());

        console.log($("#question_preview").html());
        $("#question_preview .mathquill-rendered-math").replaceWith(function (i, v) {
            if ($(this).hasClass("mathquill-editable")) {
                var lat = $(this).mathquill('latex').replace(/\\:/g, "");
                equation_array.push(lat);
            }
        
            return $('<span/>', {
                class: $(this).attr('class'),
                title: lat,
                text: $(this).hasClass("mathquill-editable") ? '' : $(this).mathquill('latex').replace(/\\:/g, "")
            });
        });
        
        $("#question_solution_preview .mathquill-rendered-math").replaceWith(function (i, v) {
            if ($(this).hasClass("mathquill-editable")) {
                var lat = $(this).mathquill('latex').replace(/\\:/g, "");
                question_solution_array.push(lat);
            }
        
            return $('<span/>', {
                class: $(this).attr('class'),
                title: lat,
                text: $(this).hasClass("mathquill-editable") ? '' : $(this).mathquill('latex').replace(/\\:/g, "")
            });
        });
        
        $("#question_distractor_preview .mathquill-rendered-math").replaceWith(function (i, v) {
            if ($(this).hasClass("mathquill-editable")) {
                var lat = $(this).mathquill('latex').replace(/\\:/g, "");
                equation_array.push(lat);
            }
        
            return $('<span/>', {
                class: $(this).attr('class'),
                title: lat,
                text: $(this).hasClass("mathquill-editable") ? '' : $(this).mathquill('latex').replace(/\\:/g, "")
            });
        });
        
        $("#question_feedback_preview .mathquill-rendered-math").replaceWith(function (i, v) {
            if ($(this).hasClass("mathquill-editable")) {
                var lat = $(this).mathquill('latex').replace(/\\:/g, "");
                equation_array.push(lat);
            }
        
            return $('<span/>', {
                class: $(this).attr('class'),
                title: lat,
                text: $(this).hasClass("mathquill-editable") ? '' : $(this).mathquill('latex').replace(/\\:/g, "")
            });
        });
        
        if( $("#choice_editor_0").length > 0){
        $("#choice_preview_choice_editor_0 .mathquill-rendered-math").replaceWith(function (i, v) {
            if ($(this).hasClass("mathquill-editable")) {
                var lat = $(this).mathquill('latex').replace(/\\:/g, "");
                choice1_array.push(lat);
            }
        
            return $('<span/>', {
                class: $(this).attr('class'),
                title: lat,
                text: $(this).hasClass("mathquill-editable") ? '' : $(this).mathquill('latex').replace(/\\:/g, "")
            });
        });
        
        if( $("#solution_editor_0").length > 0){
        $("#solution_preview_solution_editor_0 .mathquill-rendered-math").replaceWith(function (i, v) {
            if ($(this).hasClass("mathquill-editable")) {
                var lat = $(this).mathquill('latex').replace(/\\:/g, "");
                sol1_array.push(lat);
            }
        
            return $('<span/>', {
                class: $(this).attr('class'),
                title: lat,
                text: $(this).hasClass("mathquill-editable") ? '' : $(this).mathquill('latex').replace(/\\:/g, "")
            });
        });
    }
        
        if( $("#distractor_editor_0").length > 0){
        $("#distractor_preview_distractor_editor_0 .mathquill-rendered-math").replaceWith(function (i, v) {
            if ($(this).hasClass("mathquill-editable")) {
                var lat = $(this).mathquill('latex').replace(/\\:/g, "");
                dist1_array.push(lat);
            }
        
            return $('<span/>', {
                class: $(this).attr('class'),
                title: lat,
                text: $(this).hasClass("mathquill-editable") ? '' : $(this).mathquill('latex').replace(/\\:/g, "")
            });
        });
    }
    }
    
    if( $("#choice_editor_1").length > 0){
        $("#choice_preview_choice_editor_1 .mathquill-rendered-math").replaceWith(function (i, v) {
            if ($(this).hasClass("mathquill-editable")) {
                var lat = $(this).mathquill('latex').replace(/\\:/g, "");
                choice2_array.push(lat);
            }
        
            return $('<span/>', {
                class: $(this).attr('class'),
                title: lat,
                text: $(this).hasClass("mathquill-editable") ? '' : $(this).mathquill('latex').replace(/\\:/g, "")
            });
        });
        
        if( $("#distractor_editor_1").length > 0){
        $("#distractor_preview_distractor_editor_1 .mathquill-rendered-math").replaceWith(function (i, v) {
            if ($(this).hasClass("mathquill-editable")) {
                var lat = $(this).mathquill('latex').replace(/\\:/g, "");
                dist2_array.push(lat);
            }
        
            return $('<span/>', {
                class: $(this).attr('class'),
                title: lat,
                text: $(this).hasClass("mathquill-editable") ? '' : $(this).mathquill('latex').replace(/\\:/g, "")
            });
        });
    }
    
    if( $("#solution_editor_1").length > 0){
        $("#solution_preview_solution_editor_1 .mathquill-rendered-math").replaceWith(function (i, v) {
            if ($(this).hasClass("mathquill-editable")) {
                var lat = $(this).mathquill('latex').replace(/\\:/g, "");
                sol2_array.push(lat);
            }
        
            return $('<span/>', {
                class: $(this).attr('class'),
                title: lat,
                text: $(this).hasClass("mathquill-editable") ? '' : $(this).mathquill('latex').replace(/\\:/g, "")
            });
        });
    }
    
    }
    
    if( $("#choice_editor_2").length > 0){
        $("#choice_preview_choice_editor_2 .mathquill-rendered-math").replaceWith(function (i, v) {
            if ($(this).hasClass("mathquill-editable")) {
                var lat = $(this).mathquill('latex').replace(/\\:/g, "");
                choice3_array.push(lat);
            }
        
            return $('<span/>', {
                class: $(this).attr('class'),
                title: lat,
                text: $(this).hasClass("mathquill-editable") ? '' : $(this).mathquill('latex').replace(/\\:/g, "")
            });
        });
        
        if( $("#distractor_editor_2").length > 0){
        $("#distractor_preview_distractor_editor_2 .mathquill-rendered-math").replaceWith(function (i, v) {
            if ($(this).hasClass("mathquill-editable")) {
                var lat = $(this).mathquill('latex').replace(/\\:/g, "");
                dist3_array.push(lat);
            }
        
            return $('<span/>', {
                class: $(this).attr('class'),
                title: lat,
                text: $(this).hasClass("mathquill-editable") ? '' : $(this).mathquill('latex').replace(/\\:/g, "")
            });
        });
    }
    
    if( $("#solution_editor_2").length > 0){
        $("#solution_preview_solution_editor_2 .mathquill-rendered-math").replaceWith(function (i, v) {
            if ($(this).hasClass("mathquill-editable")) {
                var lat = $(this).mathquill('latex').replace(/\\:/g, "");
                sol3_array.push(lat);
            }
        
            return $('<span/>', {
                class: $(this).attr('class'),
                title: lat,
                text: $(this).hasClass("mathquill-editable") ? '' : $(this).mathquill('latex').replace(/\\:/g, "")
            });
        });
    }
    
    }
    
    if( $("#choice_editor_3").length > 0){
        $("#choice_preview_choice_editor_3 .mathquill-rendered-math").replaceWith(function (i, v) {
            if ($(this).hasClass("mathquill-editable")) {
                var lat = $(this).mathquill('latex').replace(/\\:/g, "");
                choice4_array.push(lat);
            }
        
            return $('<span/>', {
                class: $(this).attr('class'),
                title: lat,
                text: $(this).hasClass("mathquill-editable") ? '' : $(this).mathquill('latex').replace(/\\:/g, "")
            });
        });
        
        if( $("#distractor_editor_3").length > 0){
        $("#distractor_preview_distractor_editor_3 .mathquill-rendered-math").replaceWith(function (i, v) {
            if ($(this).hasClass("mathquill-editable")) {
                var lat = $(this).mathquill('latex').replace(/\\:/g, "");
                dist4_array.push(lat);
            }
        
            return $('<span/>', {
                class: $(this).attr('class'),
                title: lat,
                text: $(this).hasClass("mathquill-editable") ? '' : $(this).mathquill('latex').replace(/\\:/g, "")
            });
        });
    }
    
    if( $("#solution_editor_3").length > 0){
        $("#solution_preview_solution_editor_3 .mathquill-rendered-math").replaceWith(function (i, v) {
            if ($(this).hasClass("mathquill-editable")) {
                var lat = $(this).mathquill('latex').replace(/\\:/g, "");
                sol4_array.push(lat);
            }
        
            return $('<span/>', {
                class: $(this).attr('class'),
                title: lat,
                text: $(this).hasClass("mathquill-editable") ? '' : $(this).mathquill('latex').replace(/\\:/g, "")
            });
        });
    }
    
    }
    
    
        
        $("#question_format").val($("#question_preview").html());
        $("#question_dist_format").val($("#question_distractor_preview").html());
        $("#question_feedbck_format").val($("#question_feedback_preview").html());
        $("#question_solution").val($("#question_solution_preview").html());
        $("#choice_0").val($("#choice_preview_choice_editor_0").html());
        $("#choice_1").val($("#choice_preview_choice_editor_1").html());
        $("#choice_2").val($("#choice_preview_choice_editor_2").html());
        $("#choice_3").val($("#choice_preview_choice_editor_3").html());
        
        $("#solution_0").val($("#solution_preview_solution_editor_0").html());
        $("#solution_1").val($("#solution_preview_solution_editor_1").html());
        $("#solution_2").val($("#solution_preview_solution_editor_2").html());
        $("#solution_3").val($("#solution_preview_solution_editor_3").html());
        
        
        $("#distractor_0").val($("#distractor_preview_distractor_editor_0").html());
        $("#distractor_1").val($("#distractor_preview_distractor_editor_1").html());
        $("#distractor_2").val($("#distractor_preview_distractor_editor_2").html());
        $("#distractor_3").val($("#distractor_preview_distractor_editor_3").html());
        if($.trim(correct_choice_text).length > 0){
        var teacher_response = confirm("You have selected "+correct_option+" as correct answer. Please confirm");
        if(!teacher_response) return false;
        }
        console.log($("#question_preview").html());
        console.log($("#distractor_preview_distractor_editor_0").html());
    } else {
        // errors present
        console.log(errors);
        $('.errors_questions').html('<span>' + errors.join('</span> <br /><span>') + '</span>');
        return false;
    }
    }

}//---end of question form


//before submit
$(".edit_diagnostic_question").submit(function () {
    return question_validate();
});
$(".new_diagnostic_question").submit(function () {
    return question_validate();
});

//Question backup

$(".new_question_bkup").submit(function () {
    return question_validate("backup");
});
$(".edit_question_bkup").submit(function () {
    return question_validate("backup");
});

$(".new_exercise_question").submit(function () {
    return question_validate("exercise");
});

$(".edit_question").submit(function () {
    return question_validate("main_question");
});

$(".new_training_question").submit(function () {
    return question_validate("training");
});

$(".edit_training_question").submit(function () {
    return question_validate("training");
});

$(".new_blc_training_module_question").submit(function () {
    return question_validate("training_module");
});

$(".edit_blc_training_module_question").submit(function () {
    return question_validate("training_module");
});

$(".new_reasoning_question").submit(function () {
    return question_validate("reasoning");
});

$(".edit_reasoning_question").submit(function () {
    return question_validate("reasoning");
});




question_common.js
Displaying question_common.js.