var EditView = Backbone.View.extend({

  events: {
    "click #add-item-button": "clickAdd"
  },

  className: "add-item-container",

  initialize: function() {
    this.render()
  },

  render: function() {
    this.$el.html( templates.addItem() )
  },

  editItem: function(model) {
    this.editing = true

    this.editedModel = model

    $("#item-name").val(model.get("name"))
    $("#item-description").val(model.get("description"))
    $("#item-price").val(model.get("price"))

    showForm()
  },

  clickAdd: function() {
    var data = {
      name: $("#item-name").val(),
      description: $("#item-description").val(),
      price: $("#item-price").val(),
      group: $("#item-group").val()
    }

    $("#item-name").val("")
    $("#item-description").val("")
    $("#item-price").val("")
    $("#item-group").val("Appetizer")

    hideForm()

    if (this.editing === true) {
      this.editedModel.set(data, { validate: true })
      this.editing = false
      return
    }

    var newItem = new MenuItem(data, { validate: true })

    menuItems.add(newItem)
  }

})

var MenuView = Backbone.View.extend({

  tagName: "li",

  className: "menu-item",

  events: {
    "click .delete-item": "deleteItem",
    "click .edit-item": "editItem"
  },

  initialize: function(model) {
    this.model = model

    this.listenTo(this.model, "change", this.render)

    this.render()
  },

  render: function() {
    this.$el.html( templates.menu(this.model.display()) )
  },

  deleteItem: function() {
    this.collection.remove(this.model)
    this.remove()
  },

  editItem: function() {
    views.edit.editItem(this.model)
  }

})
