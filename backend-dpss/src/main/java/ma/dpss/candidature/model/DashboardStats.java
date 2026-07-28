package ma.dpss.candidature.model;

public class DashboardStats {

    private long total;
    private long totalEnseignants;
    private long enAttente;
    private long acceptees;
    private long refusees;

    public DashboardStats() {
    }

    public DashboardStats(long total,
                          long totalEnseignants,
                          long enAttente,
                          long acceptees,
                          long refusees) {

        this.total = total;
        this.totalEnseignants = totalEnseignants;
        this.enAttente = enAttente;
        this.acceptees = acceptees;
        this.refusees = refusees;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public long getTotalEnseignants() {
        return totalEnseignants;
    }

    public void setTotalEnseignants(long totalEnseignants) {
        this.totalEnseignants = totalEnseignants;
    }

    public long getEnAttente() {
        return enAttente;
    }

    public void setEnAttente(long enAttente) {
        this.enAttente = enAttente;
    }

    public long getAcceptees() {
        return acceptees;
    }

    public void setAcceptees(long acceptees) {
        this.acceptees = acceptees;
    }

    public long getRefusees() {
        return refusees;
    }

    public void setRefusees(long refusees) {
        this.refusees = refusees;
    }

}
