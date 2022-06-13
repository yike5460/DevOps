## Tuturial process
Env setup, all files are pre-built in folder apps, charts
```
helm repo add argo-cd https://argoproj.github.io/argo-helm
helm dep update charts/argo-cd/
helm install argo-cd charts/argo-cd/
```

Access argo web ui
```
kubectl port-forward svc/argo-cd-argocd-server 8080:443
```

Login with account 'admin' and password from command below:
```
kubectl get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```

To deploy our root application, push files in apps folder to git repo and apply the manifest, refresh web ui to see the changes
```
helm template apps/ | kubectl apply -f -
```

It should display two applications, one to monitor the root (argo-helm/apps e.g.), the other to manage the cluster (argo-helm/charts e.g.)

Credit to https://www.arthurkoziel.com/setting-up-argocd-with-helm/