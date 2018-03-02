<template>
  <div id="shelf">
    <h2>Search the Library</h2>
    <form v-on:submit.prevent="searchBooks">
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Search by author, title, or ISBN" v-model="search">
      </div>
      <button type="submit" class="btn btn-primary">Search</button>
    </form>
    <br>
    <ul class="list-group" id="results">
      <li class="list-group-item d-flex justify-content-between align-items-center" v-for="item in searchResults">
        <span>{{ item.title }}<br/> -- {{ item.author }}</span>
        <button type="button" class="btn" v-on:click="addToList(item)">Add</button>
      </li>
    </ul>
    <br><hr><br>
    <h3>Manage Your Bookshelf</h3>
    <div class="container controls">
      <button class="btn" v-on:click="showAll()">Show All</button>
      <button class="btn" v-on:click="showActive()">Show Active</button>
      <button class="btn" v-on:click="showRead()">Show Read</button>
      <button class="btn" v-on:click="removeRead()">Remove Read</button>
    </div>
    <br>
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between align-items-center" v-for="item in filteredBooks" draggable="true" v-on:dragstart="dragItem(item,$event)" v-on:dragover.prevent v-on:drop="dropItem(item)">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-auto">
              <input type="checkbox" v-model="item.read" v-on:click="readBook(item)"/>
            </div>
            <div class="col">
              <span v-bind:class="{ read: item.read }">{{ item.title }}<br/> -- {{ item.author }}</span>
            </div>
          </div>
        </div>
        <button type="button" class="btn remove" v-on:click="remove(item)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Shelf',
  data () {
    return {
      search: '',
      searchResults: [],
      bookshelf: [],
      show: 'all'
    }
  },
  computed: {
    activeBooks: function() {
      return this.bookshelf.filter(function(item) {
        return !item.read;
      });
    },
    filteredBooks: function() {
      if (this.show === 'active') {
        return this.bookshelf.filter(function(item) {
          return !item.read;
        });
      }
      if (this.show === 'completed') {
        return this.bookshelf.filter(function(item) {
          return item.read;
        });
      }
      return this.bookshelf;
    },
  },
  methods: {
    searchBooks: function() {
      var self = this;
      var input = this.search;
      input = input.replace(/ /g, '+');
      console.log(input);
      var myurl = 'https://www.googleapis.com/books/v1/volumes?q=' + input;
      $.ajax({
        url : myurl,
        success : function(json) {
          console.log(json);
          self.searchResults = [];
          $("#results").children().removeClass("disabled");
          json.items.forEach(function(book) {
            //console.log(book.volumeInfo.title);
            self.searchResults.push({title: book.volumeInfo.title, author: book.volumeInfo.authors[0], read: false});
          });
        },
        error : function() {
          console.log('error');
        }
      });
    },
    addToList: function(item) {
      //console.log(item);
      if (!this.bookshelf.includes(item)) {
        this.bookshelf.push(item);
        //console.log($("#results").children());
        var index = this.searchResults.indexOf(item);
        $("#results").children().eq(index).addClass("disabled");
      }
    },
    readBook: function(item) {
      //console.log(item);
      item.read = !item.read;
    },
    remove: function(item) {
      var index = this.bookshelf.indexOf(item);
      if (index > -1) this.bookshelf.splice(index, 1);
      index = this.searchResults.indexOf(item);
      if (index > -1) $("#results").children().eq(index).removeClass("disabled");
    },
    showAll: function() {
      this.show = 'all';
    },
    showActive: function() {
      this.show = 'active';
    },
    showRead: function() {
      this.show = 'completed';
    },
    removeRead: function() {
      var self = this;
      var read = this.bookshelf.filter(function(item) {
        return item.read;
      });
      console.log(read);
      //console.log(read);
      read.forEach(function(item) {
        var index = self.bookshelf.indexOf(item);
        if (index > -1) self.bookshelf.splice(index, 1);
        index = self.searchResults.indexOf(item);
        if (index > -1) $("#results").children().eq(index).removeClass("disabled");
      });
    },
    dragItem: function(item, event) {
      this.drag = item;
      event.dataTransfer.setData('title', '');
    },
    dropItem: function(item) {
      var indexItem = this.bookshelf.indexOf(this.drag);
      var indexTarget = this.bookshelf.indexOf(item);
      this.bookshelf.splice(indexItem, 1);
      this.bookshelf.splice(indexTarget, 0, this.drag);
    },
  },
}
</script>

<style scoped>
li {
  min-height: 4.5em;
  text-align: left;
}

button {
  margin: 5px;
}

.btn-primary {
  color: black;
  background-color: rgb(126, 182, 217);
  border-color: rgb(126, 182, 217);
}

input[type="checkbox"] {
  width: 15px;
  height: 15px;
}

.disabled button {
  display: none;
}

.read {
  text-decoration: line-through;
}

.remove {
  display: none;
}

li:hover .remove {
  display: block;
}
</style>
