<?php include("../template/cabecera.php")?>
    <!-- hacer modificaciones correspondientes  -->
<?php
$txtID=(isset($_POST['txtID']))?$_POST['txtID']:"";
$txtnombre=(isset($_POST['txtnombre']))?$_POST['txtnombre']:"";
$txtdescripcion=(isset($_POST['txtdescripcion']))?$_POST['txtdescripcion']:"";
$txtimagen=(isset($_FILES['txtimagen']['name']))?$_POST['txtnombre']['name']:"";
$accion=(isset($_FILES['accion']))?$_POST['accion']:"";

include("../config/bd.php");

switch($accion){
      
    case"Agregar":

        $sentenciaSQL= $conexion->prepare("INSERT INTO publicaciones (nombre,descripcion,imagen) VALUES (:nombre, :descripcion, :imagen);");
        $sentenciaSQL->bindParam(':nombre',$txtnombre);
        $sentenciaSQL->bindParam(':descripcion',$txtdescripcion);

        $fecha= new datetime();
        $nombreArchivo=($txtimagen!="")?$fecha->gettimestamp()."_".$_files["txtimagen"]["name"]:"imagen.jpg";

        $tmpimagen=$_files["txtimagen"]["tmp_name"];

        if($tmpimagen!=""){

        move_uploaded_file($tmpimagen, "/public/img".$nombreArchivo );

        }

        $sentenciaSQL->bindParam(':imagen',$nombreArchivo);
        $sentenciaSQL->execute();

        header("Location:noticias.php");

        break;
        case"Modificar":
            $sentenciaSQL= $conexion->prepare("update publicaciones set nombre=:nombre where id=:id");
            $sentenciaSQL->bindParam(':id',$txtID);
            $sentenciaSQL->bindParam(':nombre',$txtnombre);

            $sentenciaSQL->execute();

            if($txtimagen!=""){

                $fecha= new datetime();
                $nombreArchivo=($txtimagen!="")?$fecha->gettimestamp()."_".$_files["txtimagen"]["name"]:"imagen.jpg";
                $tmpimagen=$_files["txtimagen"]["tmp_name"];

                move_uploaded_file($tmpimagen, "/public/img" .$nombreArchivo );

                $sentenciaSQL= $conexion->prepare("select imagen from publicaciones where id=:id");
                $sentenciaSQL->bindParam(':imagen',$txtimagen);
                $sentenciaSQL->execute();
                $publicaciones= $sentenciaSQL->fetch(PDO::FETCH_LAZY);
    
                    if( isset($publicaciones["imagen"]) && ($publicaciones["imagen"]!="imagen.jpg") ){
    
                         if(file_exists("/public/img".$publicaciones["imagen"])){
    
                            unlink("/public/img".$publicaciones["imagen"]);
    
                         }   
    
                    }


                $sentenciaSQL= $conexion->prepare("update publicaciones set imagen=:imagen where id=:id");
                $sentenciaSQL->bindParam(':id',$txtID);
                $sentenciaSQL->bindParam(':imagen',$nombreArchivo);
                $sentenciaSQL->execute();

            
            }
        header("Location:noticias.php");
            //echo "Presionado boton modificar";
        break;
        case"Cancelar":
              header("Location:noticias.php");
        break;
        case"Seleccionar":

                $sentenciaSQL= $conexion->prepare("select * from publicaciones where id=:id");
                $sentenciaSQL->bindParam(':id',$txtID);
                $sentenciaSQL->execute();
                $publicaciones= $sentenciaSQL->fetch(PDO::FETCH_LAZY);

                $txtnombre=$publicaciones['nombre'];
                $txtnombre=$publicaciones['descripcion'];
                $txtnombre=$publicaciones['imagen'];
           // echo "Presionado boton Seleccionar";          
        break;
        case"Borrar":   
            $sentenciaSQL= $conexion->prepare("select imagen from publicaciones where id=:id");
            $sentenciaSQL->bindParam(':imagen',$txtimagen);
            $sentenciaSQL->execute();
            $publicaciones= $sentenciaSQL->fetch(PDO::FETCH_LAZY);

                if( isset($publicaciones["imagen"]) && ($publicaciones["imagen"]!="imagen.jpg") ){

                     if(file_exists("/public/img".$publicaciones["imagen"])){

                        unlink("/public/img".$publicaciones["imagen"]);

                     }   

                }

            $sentenciaSQL= $conexion->prepare("delete from publicaciones where id=:id");
            $sentenciaSQL->bindParam(':id',$txtID);
            $sentenciaSQL->execute();
            header("Location:noticias.php");
            //echo "Presionado boton Borrar";          
        break;
}

$sentenciaSQL= $conexion->prepare("select * from publicaciones");
$sentenciaSQL->execute();
$listapublicaciones= $sentenciaSQL->fetchall(PDO::FETCH_ASSOC);

?>
<div class="col-md-5">
    <div class="card-body">
        <form method="POST" enctype="multipart/form-data">
        
        <div class="form-group">
            <label for="txtID">ID</label>
            <input type="hidden" class="form-control" id="txtID" placeholder="ID">
        </div>
        <div class="form-group">
            <label for="txtnombre">Nombre:</label>
            <input type="text" required class="form-control" id="txtnombre" placeholder="Nombre De Noticia">
        </div>
        <div class = "form-group">
            <label for="txtDescripcion">Descripcion:</label>
            <input type="text" required class="form-control" name="txtDescripcion" id="txtDescripcion"  placeholder="Descripcion de Noticia">
        </div>
        <div class="form-group">
            <label for="txtID">imagen</label>

            <br/>

            <?php  if($txtimagen){?>
                /* agregar direccion de carpeta imagenes */ 
                <img class="img-thumbnail rounded" src="../../<?php echo $txtimagen; ?>"width="70" alt=""srcset="">

           <?php } ?>

            <input type="file"  class="form-control" id="txtnombre" placeholder="imagen">
        </div>


        <div class="btn-group" role="group" aria-label="">
        <button type="submit" name="accion" <?php echo($accion=="seleccionar")?"disable":"";?> value="agregar" class="btn btn-success">Agregar</button>
        <button type="submit" name="accion" <?php echo($accion!="seleccionar")?"disable":"";?>value="modificar" class="btn btn-warming">Modificar</button>
        <button type="submit" name="accion" <?php echo($accion!="seleccionar")?"disable":"";?> value="cancelar" class="btn btn-info">Cancelar</button>
        </div>



     </form>
    </div>
</div>
<div class="col-md-7">
   <table class="table table-bordered">
    <thead>
        <tr>
            <th>ID</th>
            <th>Nombre/th>
            <th>descripcion</th>
            <th>imagen</th>
            <th>acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach($listapublicaciones as $publicaciones){?>
        <tr>
            <td><?php echo $publicaciones['id'];?></td>
            <td><?php echo $publicaciones['nombre'];?></td>
            <td><?php echo $publicaciones['descripcion'];?></td>
            <td>
                /* agregar direccion de carpeta imagenes */ 

                <img  class="img-thumbnail rounded" src="../../<?php echo $publicaciones['imagen'];?>"width="70" alt=""srcset="">
            
            </td>
            <td>

            <form method="post">

                <input type="hidden" name="txtID" value="<?php echo $publicaciones['id'];?>">
                <input type="sumit" name="accion" value="Seleccionar" class="btn btn-primary">
                <input type="sumit" name="accion" value="Borrar" class="btn btn-danger">

            </form>

            </td>
        </tr>
        <?php }?>
    </tbody>
   </table>
</div>

<?php include("../template/pie.php")?>