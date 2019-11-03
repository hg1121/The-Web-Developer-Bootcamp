// check off specific todos by clicking
$("ul").on("click","li",function(){
	// $(this).css("color","gray");
	// $(this).css("text-decoration","line-through");
	$(this).toggleClass("completed");
});

//click X to delete todo
$("ul").on("click","span",function(event){
	$(this).parent().fadeOut(500,function(){ //fadeout will hide the li
		$(this).remove()	// this refer to the li not span
	}); 
	event.stopPropagation(); // won't effect the perant element like li/ul/body
});

$("input[type='text']").keypress(function(event){
	if(event.which === 13){
		//get the new todo text from input
		var todoText = $(this).val();
		//creat a new li and add to ul
		$("ul").append("<li> <span> <i class='fas fa-trash-alt'></i> </span>" + todoText + "</li>");
	}
});

$(".fa-plus").click(function(){
	$("input[type = 'text']").fadeToggle()
})