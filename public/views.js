//TOC view page
var TocView = Backbone.View.extend({
  className: "Leila",
  initialize: function(model){
    this.model = model

    this.listenTo(this.model, "change", this.render)

    this.render()
  },
  
  render: function(){
    console.log("tocview", this.model)
    this.$el.html(templates.Toc(this.model.toJSON()) )
      },
  
})

//Pages view
var PagesView = Backbone.View.extend({
   
   className:"Bella",

   events:{
    "click .editButton": "editItem",
    "click .deleteButton": "deleteItem" ,
    //edit page events
    "click .cancelPage": "cancelItem",
    "click .editPage": "editPage"

   },

  initialize: function(model){
    this.model = model

    this.listenTo(this.model, "change", this.render)

    this.render()
  },
  
  render: function(){
    console.log("pages", this.model)
    this.$el.html(templates.Pages(this.model.toJSON()) )
  },
  
  deleteItem: function(){
    // a = this.attributes.id
    // b = book.get(a).cid
    
    // console.log("cid", this.model.cid)
    this.model.destroy()
    
   
  },
  editItem:function(){
    showEdit()
    console.log("model", this.model)
    //console.log(this.model.get("title"))
    $(".createTitle").val(this.model.get("title"))
    $(".createText").val(this.model.get("paragraphs"))
    
    // $(".editPage").on("click", function(){
    //    console.log()
    //})
  },
  editPage:function(){
    console.log("model2", this.model)
    var data = {
      title: $(".createTitle").val(),
      paragraphs: $(".createText").val(),
      }
      this.model.save(data)
      console.log("set", this.model)
      this.render()
  },
  cancelItem:function(){
    hideEdit()
  }
})



//Edit page
var showEdit = function(){
  $(".editSection").show()
  $(".pageSection").hide()
  $(".createButton").hide()
  $(".backButton").show()

}
var hideEdit = function(){
  $(".editSection").hide()
  $(".pageSection").show()
  $(".createButton").show()
  $(".backButton").hide()
}



//add page
$(".backButton").on("click", function(){
  location.reload()
})

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
   $(".backButton").show()
  
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
    pageNumber: this.model
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

  location.reload()

})
