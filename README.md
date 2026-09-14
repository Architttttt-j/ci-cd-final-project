# Continuous Integration and Continuous Delivery (CI/CD) Final Project (Option B: JavaScript)

[![CI Pipeline](https://github.com/nivesh4087-spec/cicd-final-project-js/actions/workflows/ci.yml/badge.svg)](https://github.com/nivesh4087-spec/cicd-final-project-js/actions/workflows/ci.yml)
![Node.js](https://img.shields.io/badge/Node.js-v18%20%7C%20v20-brightgreen)
![Tekton](https://img.shields.io/badge/Tekton-Pipelines-blue)
![OpenShift](https://img.shields.io/badge/OpenShift-Container%20Platform-red)

## Overview
This repository contains the complete implementation for the **Continuous Integration and Continuous Delivery (CI/CD) Final Project (Option B: JavaScript)**. It establishes an end-to-end continuous integration and delivery pipeline for a Node.js Express web application using **GitHub Actions**, **Tekton Pipelines**, and **Red Hat OpenShift**.

### Repository Details
- **GitHub Username**: `nivesh4087-spec`
- **Repository URL**: [https://github.com/nivesh4087-spec/cicd-final-project-js.git](https://github.com/nivesh4087-spec/cicd-final-project-js.git)

---

## Objectives Accomplished

1. **GitHub Actions CI Pipeline**: Configured `.github/workflows/ci.yml` with steps for dependency installation, ESLint linting, and Jest unit testing on code push or pull request.
2. **Tekton Tasks**: Created custom modular Tekton Task CRDs for:
   - Code Linting (`tekton/tasks/lint-task.yaml`)
   - Unit Testing (`tekton/tasks/test-task.yaml`)
   - Container Image Building using Buildah (`tekton/tasks/build-task.yaml`)
   - OpenShift Deployment (`tekton/tasks/deploy-task.yaml`)
3. **OpenShift Tekton Pipeline**: Defined `tekton/pipeline.yaml` chaining tasks sequentially: `lint-code` -> `test-code` -> `build-image` -> `deploy-app`. Created `tekton/pipelinerun.yaml` for pipeline triggering.
4. **OpenShift Deployment**: Authored Kubernetes / OpenShift manifests inside `deploy/` (`deployment.yaml`, `service.yaml`, `route.yaml`) configured for non-root execution and health probes.

---

## Project Structure

```
cicd-final-project-js/
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions CI Workflow for Lint & Test
├── tekton/
│   ├── tasks/
│   │   ├── lint-task.yaml         # Tekton Task for ESLint
│   │   ├── test-task.yaml         # Tekton Task for Jest Unit Tests
│   │   ├── build-task.yaml        # Tekton Task for Image Build (Buildah)
│   │   └── deploy-task.yaml       # Tekton Task for OpenShift Deployment (oc apply)
│   ├── pipeline.yaml              # Tekton Pipeline linking Lint -> Test -> Build -> Deploy
│   └── pipelinerun.yaml           # Tekton PipelineRun specification
├── deploy/
│   ├── deployment.yaml            # OpenShift/K8s Deployment manifest (Port 8080)
│   ├── service.yaml               # Kubernetes ClusterIP Service
│   └── route.yaml                 # OpenShift Route manifest for external access
├── tests/
│   └── app.test.js                # Unit tests using Jest & SuperTest
├── .eslintrc.json                 # ESLint rules configuration
├── .gitignore                     # Git ignore file for node_modules & build artifacts
├── Dockerfile                     # Multi-stage container build for Node.js app
├── app.js                         # Express application logic
├── index.js                       # HTTP server entry point
├── package.json                   # Node.js dependencies, scripts (start, test, lint)
└── README.md                      # Complete project documentation & lab guide
```

---

## Local Development & Testing

### Prerequisites
- Node.js (v18.x or v20.x)
- npm (v9.x or higher)

### Commands
```bash
# 1. Install Dependencies
npm install

# 2. Run Linter (ESLint)
npm run lint

# 3. Run Unit Tests (Jest)
npm test

# 4. Start Application
npm start
```

---

## OpenShift & Tekton Pipeline Deployment Guide

To deploy this CI/CD pipeline on an OpenShift cluster:

```bash
# 1. Login to OpenShift Cluster
oc login --token=<YOUR_TOKEN> --server=<YOUR_SERVER_URL>

# 2. Apply Tekton Tasks
oc apply -f tekton/tasks/lint-task.yaml
oc apply -f tekton/tasks/test-task.yaml
oc apply -f tekton/tasks/build-task.yaml
oc apply -f tekton/tasks/deploy-task.yaml

# 3. Apply Tekton Pipeline
oc apply -f tekton/pipeline.yaml

# 4. Trigger PipelineRun
oc create -f tekton/pipelinerun.yaml

# 5. Monitor Pipeline Execution
tkn pipelinerun logs -f -l tekton.dev/pipeline=cd-pipeline

# 6. Verify Deployment Status
oc get pods -l app=cicd-js-app
oc get route cicd-js-app
```

---

## License & Author
- **Author**: nivesh4087-spec
- **License**: MIT
