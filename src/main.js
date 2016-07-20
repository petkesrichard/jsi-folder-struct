const folders = [
  {
    type: 'dir',
    name: 'app',
    children: [
      {
        type: 'file',
        name: 'index.html'
      },
      {
        type: 'dir',
        name: 'js',
        children: [
          {
            type: 'file',
            name: 'main.js'
          },
          {
            type: 'file',
            name: 'app.js'
          },
          {
            type: 'file',
            name: 'misc.js'
          },
          {
            type: 'dir',
            name: 'vendor',
            children: [
              {
                type: 'file',
                name: 'jquery.js'
              },
              {
                type: 'file',
                name: 'underscore.js'
              }
            ]
          }
        ]
      },
      {
        type: 'dir',
        name: 'css',
        children: [
          {
            type: 'file',
            name: 'reset.css'
          },
          {
            type: 'file',
            name: 'main.css'
          }
        ]
      }
    ]
  }
];


function displayTree(obj){

  var ul = document.createElement('ul');
  ul.setAttribute('class','folder-container');


  for(var index in obj){

    var li_items = document.createElement('li');
    var li_wrapper = document.createElement('li');
    var item_name = document.createTextNode(obj[index].name);

    li_wrapper.setAttribute('class','folder-wrapper');
    li_items.appendChild(item_name);

    if(obj[index].type==="dir")
      li_items.setAttribute('class','folder-item');
    else if (obj[index].type==='file')
      li_items.setAttribute('class','file-item');

    if(obj[index].children)
      li_wrapper.appendChild(displayTree(obj[index].children));

    ul.appendChild(li_items);
    ul.appendChild(li_wrapper);
  }

  return ul;

}





var matches = [];

function filterList(obj){

  var input = document.getElementById("filterinput").value;

  for(var index in obj){

    var item_name = '';
    item_name += obj[index].name;

    if(item_name.indexOf(input) > -1)

    {
      if(obj[index].type == "dir")
        matches.push(obj[index]);
      else if(obj[index].type == "file")
        matches.push(obj[index]);

    }

    else if(obj[index].children){
      filterList(obj[index].children);
    }

  }

  return matches;

}


function searchList(){

  filterList(folders);
  var ul = displayTree( matches);
  document.getElementById('folders').innerHTML = '';
  document.getElementById('folders').appendChild(ul);
  matches = [];

}

searchList();