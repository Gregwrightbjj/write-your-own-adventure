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
		book.fetch({
			success: function(data){
			console.log("toc",data)
				views.toc = new TocView(data)
				$("#enterHere").html(views.toc.$el)}
			
			})
		},
	

	specificPage: function(pageNumber){

	views.pages = new PagesView(book.get(pageNumber)) 
	 $("#enterHere").html(views.pages.$el)
	}
})



$(document).on("ready", function(){
	
	templates ={
		Toc: Handlebars.compile($("#toc-template").text() ),
		Pages: Handlebars.compile($("#pages-template").text() ),
		Edit: Handlebars.compile($("#edit-template").text())

	}

	//new Router
	var router = new Router()
	

	book.fetch({
		success: function(){
			Backbone.history.start()
		}
	})
	
	
})