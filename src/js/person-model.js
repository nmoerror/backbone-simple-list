// Person Model
let Person = Backbone.Model.extend({
  defaults: {
    name: "",
    dob: ""
  }
});

// Array of Persons & instantiate
let Persons = Backbone.Collection.extend({});
let persons = new Persons();

// DOM element for person item
var PersonView = Backbone.View.extend({
  model: new Person(),
  // div by default, tr in this case for table row
  tagName: "tr",
  // Runs at the beginning
  initialize: function() {
    // Set default template for this person item
    this.template = _.template($(".persons-list-template").html());
  },
  // Delegate events
  events: {
    "click .delete-person": "delete"
  },
  delete: function() {
    this.model.destroy();
  },
  render: function() {
    // Pass in values of the created person to template
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

// DOM element for persons item
var PersonsView = Backbone.View.extend({
  // Collection of person item
  model: persons,
  // Target persons-list div
  el: $(".persons-list"),
  initialize: function() {
    // Re-render when object added/removed from collection
    this.model.on("add", this.render, this);
    this.model.on("remove", this.render, this);
  },
  render: function() {
    // vanilla JS to not abuse JQuery
    document.getElementById("count").textContent = persons.length;
    var self = this;
    this.$el.html("");
    // Underscore iteration through each model
    this.model.toArray().map(person => {
      self.$el.append(new PersonView({ model: person }).render().$el);
    });

    return this;
  }
});

var personsView = new PersonsView();

$(document).ready(() => {
  $(".add-person").on("click", () => {
    if ($(".name-input").val() !== "") {
      //Instantiate new  Person object with input values
      var person = new Person({
        name: $(".name-input").val(),
        dob: $(".dob-input").val()
      });
      // Emptying input bars
      $(".name-input").val("");
      $(".dob-input").val("");
      // Add to Collection
      persons.add(person);
    }
  });
});
