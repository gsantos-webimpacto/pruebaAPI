<?php
namespace App\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use App\Entity\Pais;
use App\Entity\Idioma;
use App\Entity\Provincia;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class RegisterController extends AbstractController
{
    /** 
    * @Route("/register") 
    */ 
    //funcion que redireige al formulario de registro
    public function hello(EntityManagerInterface $manager)
    {   
        $manager = $this->getDoctrine()->getRepository(Pais::class);
        $listadopaises=$manager->findAll();
        if(count($listadopaises)==0){
            $listadopaises=null;
            $listadoprovincia=null;
        }else{
            $manager = $this->getDoctrine()->getRepository(Provincia::class);
            $listadoprovincia=$manager->findByPais($listadopaises[0]->getIdpais());
            if(count($listadoprovincia)==0){
                $listadoprovincia=null;
            }
        }
        $manager = $this->getDoctrine()->getRepository(Idioma::class);
        $listadoidioma=$manager->findAll();
        if(count($listadoidioma)==0){
            $listadoidioma=null;
            
        }
        // $listadopaises=null;
        // $listadoprovincia=null;  
        // $listadoidioma=null;
        return $this->render('Registro/register.html.twig',array('listadopaises'=>$listadopaises,'listadoidioma'=>$listadoidioma, 'listadoprovincia'=>$listadoprovincia));
    }
    /** 
    * @Route("/register/registrarusuario") 
    */ 
    //Funcion que inserta un usuario en la base de datos
    public function registrar(EntityManagerInterface $manager ,UserPasswordEncoderInterface $passwordEncoder)
    {   
        $entityManager = $this->getDoctrine()->getManager();
        $user = new User();
        $manager = $this->getDoctrine()->getRepository(Pais::class);
        $pais=$manager->find($_REQUEST["pais"]);
        $user->setPais($pais);
        $manager = $this->getDoctrine()->getRepository(Idioma::class);
        $idioma=$manager->find($_REQUEST["idioma"]);
        $user->setIdioma($idioma);
        $manager = $this->getDoctrine()->getRepository(Provincia::class);
        $provincia=$manager->find($_REQUEST["provincia"]);  
        $user->setProvincia($provincia);      
        $user->setNombre($_REQUEST["nombre"]);
        $user->setApellidos($_REQUEST["apellidos"]);
        $user->setUsername($_REQUEST["email"]); 
        // dump($_REQUEST["fechaNacimiento"]);
        $date = date_create_from_format('Y-m-d', $_REQUEST["fechaNacimiento"]);
        $user->setFechadenacimiento($date);
        $user->setSexo($_REQUEST["sexo"]);
        $user->setTelefono($_REQUEST["telefono"]);
        $user->setDatosadicionales($_REQUEST["datosAdicionales"]); 
        $user->setCiudad($_REQUEST["ciudad"]);
        $user->setDireccion($_REQUEST["direccion"]);
        $user->setCodigopostal($_REQUEST["codigoPostal"]);
        $user->setRoles(["ROLE_USER"]);
        $passwordForm = $_REQUEST["password"];
        if($passwordForm!=""){
            $password = $passwordEncoder->encodePassword($user,$passwordForm);
            $user->setPassword($password);
        }
        // dump($user);
        $entityManager->persist($user);
        $entityManager->flush();
        return $this->redirect('/login');

    }
    
}