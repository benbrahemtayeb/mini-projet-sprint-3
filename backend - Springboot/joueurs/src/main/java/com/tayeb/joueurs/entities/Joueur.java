package com.tayeb.joueurs.entities;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import java.util.List;
import jakarta.persistence.OneToMany;

@Entity
public class Joueur {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idJoueur;
	private String nomJoueur;
	private String email;
	private Double prixJoueur;
	private int dureContrat;
	private Date dateTransfert;
	@OneToMany(mappedBy = "joueur")
	private List<Image> images;

	private String imagePath;
	
	@ManyToOne
	private Equipe equipe;
	
	public Joueur() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Joueur(String nomJoueur, String email, Double prixJoueur, int dureContrat,
			Date dateTransfert) {
		super();
		this.nomJoueur = nomJoueur;
		this.email = email;
		this.prixJoueur = prixJoueur;
		this.dureContrat = dureContrat;
		this.dateTransfert = dateTransfert;
		
	}
	public Equipe getEquipe() {
		return equipe;
	}

	public void setEquipe(Equipe equipe) {
		this.equipe = equipe;
	}
	public Long getIdJoueur() {
		return idJoueur;
	}
	public void setIdJoueur(Long idJoueur) {
		this.idJoueur = idJoueur;
	}
	public String getNomJoueur() {
		return nomJoueur;
	}
	public void setNomJoueur(String nomJoueur) {
		this.nomJoueur = nomJoueur;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Double getPrixJoueur() {
		return prixJoueur;
	}
	public void setPrixJoueur(Double prixJoueur) {
		this.prixJoueur = prixJoueur;
	}
	public int getDureContrat() {
		return dureContrat;
	}
	public void setDureContrat(int dureContrat) {
		this.dureContrat = dureContrat;
	}
	public Date getDateTransfert() {
		return dateTransfert;
	}
	public void setDateTransfert(Date dateTransfert) {
		this.dateTransfert = dateTransfert;
	}

	@Override
	public String toString() {
		return "Joueur [idJoueur=" + idJoueur + ", nomJoueur=" + nomJoueur + ", email=" + email + ", prixJoueur="
				+ prixJoueur + ", dureContrat=" + dureContrat + ", dateTransfert=" + dateTransfert + "]";
	}
	public List<Image> getImages() {
	    return images;
	}
	public void setImages(List<Image> images) {
	    this.images = images;
	}
	public String getImagePath() {
	    return imagePath;
	}
	public void setImagePath(String imagePath) {
	    this.imagePath = imagePath;
	}
	
	
}
	
