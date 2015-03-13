var x = function(){}
var templates = {}
var views = {}

//model and collection
var Page = Backbone.Model.extend({
	defaults:{
		title: "unknown",
		paragraphs: "nothing"
	},

})

var Book = Backbone.Collection.extend({
	url: "/api/page",
	model: Page
	
})

var book = new Book()
//Routes
var Router = Backbone.Router.extend({

	routes:{
		"": "tableOfContents",
		"page/:pageNumber": "specificPage"
	},

	tableOfContents: function(){
		$.ajax({
			url: "/api/page",
			method: "GET",
			success: function(data){
				console.log(data)
				views.toc.update(data)
				$("#enterHere").html(views.toc.$el)
			}
		})
	},

	specificPage: function(pageNumber){
		$.ajax({
			url:"/api/page/" +pageNumber,
			method: "GET",
			success:function(data){
				console.log("ss", data)
				views.pages.update(data)
				$("#enterHere").html(views.pages.$el)
			}
		})
	}
})





var TocView = Backbone.View.extend({
	className: "Leila",
	initialize: function(){
		this.data = {}
		this.render()
	},
	
	render: function(){
		console.log("jjj", this.data)
		this.$el.html(templates.Toc(this.data))
	},
	
	update: function(data){
		this.data = data
		this.render()
	}
	
})

//Pages view
var PagesView = Backbone.View.extend({
	 className:"Bella",

	initialize: function(){
	
		this.data = {}
		this.render()
	},
	
	render: function(){
		console.log("pages", this.data)
		this.$el.html(templates.Pages(this.data))
	},
	
	update: function(data){
		this.data = data
		this.render()
	}
	
})

//add page
var showAdd = function() {
  $(".add-header-wrap").show()
  $(".toc-header-wrap").hide()
}

var hideAdd = function() {
  $(".add-header-wrap").hide()
  $(".toc-header-wrap").show()
}

$(".createButton").on("click", function(){
	showAdd()
	
})
$(".cancelPage").on("click", function(){
	$(".createTitle").val("")
	$(".createText").val("")
	hideAdd()
	
})
$(".addPage").on("click", function(){
	var Title = $(".createTitle").val()
	var Textt = $(".createText").val()


	var data = {
		title: Title,
		paragraphs: Textt,
		}
$.ajax({
      url: "/api/page",
      method: "POST",
      data: {
      	title: Title,
      	paragraphs: Textt,
      },
      success: function(updatedTask) {
        console.log(updatedTask)
      }
    })

})

$(document).on("ready", function(){
	
	templates ={
		Toc: Handlebars.compile($("#toc-template").text() ),
		Pages: Handlebars.compile($("#pages-template").text() )

	}

	//Pages view instance
	views.pages = new PagesView()
	
	//Toc view instance 
	views.toc = new TocView() 
	//new Router
	var router = new Router()
	//creates date
	

	//initiates routes
	Backbone.history.start()

})