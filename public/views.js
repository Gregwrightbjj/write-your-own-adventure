var TocView = Backbone.View.extend({
  className: "Leila",
  initialize: function(model){
    this.model = model

    this.listenTo(this.model, "change", this.render)

    this.render()
  },
  
  render: function(){
    console.log("tocview", this.data)
    this.$el.html(templates.Toc(this.model.toJSON()) )
      },
  
  update: function(data){
    this.data = data
    this.render()
  }
  
})

//Pages view
var PagesView = Backbone.View.extend({
   className:"Bella",

   events:{
    "click .editButton": "editItem",
    "click .deleteButton": "deleteItem" 

   },

  initialize: function(model){
    this.model = model

    this.listenTo(this.model, "change", this.render)

    this.render()
  },
  
  render: function(){
    console.log("pages", this.data)
    this.$el.html(templates.Pages(this.model.toJSON()) )
  },
  
  update: function(data){
    this.data = data
    this.render()
  },
  deleteItem: function(){
    console.log("b4",this.model)
   
   this.destroy()
   this.render()
  }
})
//Update Functions
var updateUI = function(){

  $("#enterHere").html("")
}
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
