<?php
// src/Controller/EditarCuentaController.php
namespace App\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\Constraints\DateTime;
use App\Entity\User;
use App\Entity\Pais;
use App\Entity\Idioma;
use App\Entity\Provincia;
class EditarCuentaController extends AbstractController
{
    /** 
    * @Route("/mi-cuenta") 
    */ 
    public function edit()
    {
        $user = $this->get('security.token_storage')->getToken()->getUser();
        $em = $this->getDoctrine()->getManager()->getRepository(Pais::class);         
        $listadopaises=$em->findAll(); 
        $em = $this->getDoctrine()->getRepository(Provincia::class);         
        $listadoprovincias=$em->findByPais($listadopaises[0]->getIdpais());
        $em = $this->getDoctrine()->getRepository(Idioma::class);   
        $listadoidiomas=$em->findAll();
        return $this->render('usuario/mi-cuenta.html.twig',array('listadopaises'=>$listadopaises,'listadoprovincias'=>$listadoprovincias
                                                                    ,'listadoidiomas'=>$listadoidiomas));
    }
    /** 
    * @Route("/mi-cuenta/editarCuenta") 
    */ 
    public function editar(UserPasswordEncoderInterface $passwordEncoder){
        
        //dump("Llega a editar en el controller"); 
        $entityManager = $this->getDoctrine()->getManager();
        $user = $this->get('security.token_storage')->getToken()->getUser();
        $passwordForm = $_REQUEST["password"];
        if($passwordForm!=""){
            $password = $passwordEncoder->encodePassword($user,$passwordForm);
            $user->setPassword($password);
        }
        $user->setNombre($_REQUEST["nombre"]);
        $user->setApellidos($_REQUEST["apellidos"]);
        $user->setUsername($_REQUEST["email"]);
        //dump($_REQUEST["fechaNacimiento"]);
        $date = date_create_from_format('Y-m-d', $_REQUEST["fechaNacimiento"]);
        $user->setFechadenacimiento($date);
        //dump($user->getFechadenacimiento());
        $user->setSexo($_REQUEST["sexo"]);
        $user->setTelefono($_REQUEST["telefono"]);
        $user->setDatosadicionales($_REQUEST["datosAdicionales"]);
        $entityManager = $this->getDoctrine()->getRepository(Pais::class);
        $pais=$entityManager->find($_REQUEST["pais"]);
        $user->setPais($pais);
        $entityManager = $this->getDoctrine()->getRepository(Idioma::class);
        $idioma=$entityManager->find($_REQUEST["idioma"]);
        $user->setIdioma($idioma);
        $entityManager = $this->getDoctrine()->getRepository(Provincia::class);
        $provincia=$entityManager->find($_REQUEST["provincia"]);
        $user->setProvincia($provincia);
        $user->setCiudad($_REQUEST["ciudad"]);
        $user->setDireccion($_REQUEST["direccion"]);
        $user->setCodigopostal($_REQUEST["codigoPostal"]);
        //dump($user);
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->flush();

        $em = $this->getDoctrine()->getManager()->getRepository(Pais::class);         
        $listadopaises=$em->findAll(); 
        $em = $this->getDoctrine()->getRepository(Provincia::class);         
        $listadoprovincias=$em->findAll();
        $em = $this->getDoctrine()->getRepository(Idioma::class);         
        $listadoidiomas=$em->findAll();
        return $this->render('usuario/mi-cuenta.html.twig',array('listadopaises'=>$listadopaises,'listadoprovincias'=>$listadoprovincias
                                                                    ,'listadoidiomas'=>$listadoidiomas));
    }
}