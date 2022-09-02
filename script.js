app = new Vue ({
    el : '#app',
    vuetify: new Vuetify(),
    data: {
        message: 'Ola Vue',
        tasks:[],
        loading: false,
        dialog: false,
        title: '',
        description:'',
        email:'',
        date: '',
        editTasks:[],
        dialogEdit: false,
        taskIdEdit: null,
   },
   methods: {
    async getTasks(){
        const req = await fetch ("http://localhost:3000/tasks");

        const data = await req.json()

        this.tasks = data;

    },
    async remove (id) {
        this.loading = true

       

        await new Promise(resolve => setTimeout(resolve, 800))

        const req = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "DELETE",
        });

        const response = await req.json()

        // const res = await axios.delete(`http://localhost:3000/tasks/${id}`)

        this.loading = false

        this.getTasks()
        
      },
    async addNewTask(e){
        e.preventDefault();
        const data = {
            title: this.title,
            description: this.description,
            email: this.email,
            date: this.date,
        };
        
        const dataJson = JSON.stringify(data);

        const req = await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: dataJson,
        })

        const response = await req.json()

        this.dialog = false

        this.getTasks()

    },

    async editTask(id){
        const req = await fetch(`http://localhost:3000/tasks/${id}`)

        const response = await req.json()

        this.editTasks = response

        this.title = this.editTasks.title
        this.description = this.editTasks.description
        this.email = this.editTasks.email
        this.date = this.editTasks.date

        this.taskIdEdit = id

        this.dialogEdit = true


    },

    async sendEdit(){
        const data = {
            title: this.title,
            description: this.description,
            email: this.email,
            date: this.date,
        };
        
        const dataJson = JSON.stringify(data);

        const req = await fetch(`http://localhost:3000/tasks/${this.taskIdEdit}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: dataJson,
        })

        this.title = '';
        this.description = '';
        this.email = '';
        this.date = '';

        this.dialogEdit = false


        this.getTasks()
    },
    async closeEdit(){
        this.title = '';
        this.description = '';
        this.email = '';
        this.date = '';

        this.dialogEdit = false
    },
   },
   mounted(){
    this.getTasks();
   }
})

